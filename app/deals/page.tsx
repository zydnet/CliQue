"use client";
import { useState, useEffect } from "react";
import { DealCard } from "@/components/deal-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { formatCurrencyCompact } from "@/lib/currency";
import { ResponsiveManager } from "@/lib/responsive-manager";
import { allDeals } from "@/app/deals/deals"; // Import the mock data

export default function DealsPage() {
  const [deals, setDeals] = useState(allDeals);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [loading, setLoading] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("sm");

  const responsiveManager = ResponsiveManager.getInstance();

  useEffect(() => {
    setCurrentBreakpoint(responsiveManager.getCurrentBreakpoint());

    const handleBreakpointChange = (breakpoint: string) => {
      setCurrentBreakpoint(breakpoint);
    };

    responsiveManager.subscribe(handleBreakpointChange);

    return () => {
      responsiveManager.unsubscribe(handleBreakpointChange);
    };
  }, [responsiveManager]);

  // Filter and sort deals
  useEffect(() => {
    let filteredDeals = allDeals;

    // Search filter
    if (searchTerm) {
      filteredDeals = filteredDeals.filter(
        (deal) =>
          deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          deal.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          deal.product?.vendor?.businessName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filteredDeals = filteredDeals.filter(
        (deal) => deal.product?.category === selectedCategory
      );
    }

    // Sort
    switch (sortBy) {
      case "ending-soon":
        filteredDeals.sort(
          (a, b) =>
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        );
        break;
      case "most-popular":
        filteredDeals.sort((a, b) => b.currentCount - a.currentCount);
        break;
      case "biggest-savings":
        filteredDeals.sort((a, b) => {
          const savingsA = a.product ? a.product.basePrice - a.pricePerItem : 0;
          const savingsB = b.product ? b.product.basePrice - b.pricePerItem : 0;
          return savingsB - savingsA;
        });
        break;
      case "newest":
        filteredDeals.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        break;
    }

    setDeals(filteredDeals);
  }, [searchTerm, selectedCategory, sortBy]);

  const totalSavings = deals.reduce((sum, deal) => {
    const savings = deal.product
      ? deal.product.basePrice - deal.pricePerItem
      : 0;
    return sum + savings * deal.currentCount;
  }, 0);

  const categories = [
    "all",
    "Food & Beverages",
    "Health & Beauty",
    "Home & Garden",
    "Electronics",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            🔥 Active Group Deals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Join these group deals and save money with your community
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search deals..."
                className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectItem
                  value="ending-soon"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Ending Soon
                </SelectItem>
                <SelectItem
                  value="most-popular"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Most Popular
                </SelectItem>
                <SelectItem
                  value="biggest-savings"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Biggest Savings
                </SelectItem>
                <SelectItem
                  value="newest"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Newest
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Bangalore
            </Button>
          </div>

          {/* Active filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge
                variant="secondary"
                className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                onClick={() => setSearchTerm("")}
              >
                Search: {searchTerm} ✕
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                onClick={() => setSelectedCategory("all")}
              >
                {selectedCategory} ✕
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center shadow-sm transition-colors duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-primary-500 dark:text-primary-400 mb-2">
              {deals.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Active Deals
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center shadow-sm transition-colors duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-secondary-500 dark:text-secondary-400 mb-2">
              {deals.reduce((sum, deal) => sum + deal.currentCount, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              People Joined
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center shadow-sm transition-colors duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-accent-500 dark:text-accent-400 mb-2">
              {formatCurrencyCompact(totalSavings)}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Total Savings
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center shadow-sm transition-colors duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-error-500 mb-2">
              {
                deals.filter((deal) => {
                  const timeLeft =
                    new Date(deal.endDate).getTime() - new Date().getTime();
                  return timeLeft < 24 * 60 * 60 * 1000;
                }).length
              }
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Ending Soon
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : deals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No deals found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {/* {deals.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setLoading(true)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Load More Deals
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}
