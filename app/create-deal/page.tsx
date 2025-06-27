"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Eye, Save, Package, IndianRupee, Settings, Truck, Globe, ImagePlus, X } from "lucide-react"
import { BackgroundElements } from "@/components/background-elements"

interface FormData {
  // Product Info
  productName: string
  category: string
  shortDescription: string
  longDescription: string
  images: File[]
  sku: string
  tags: string[]
  brand: string

  // Pricing & Thresholds
  regularPrice: number
  groupPrice: number
  minGroupSize: number
  maxPerBuyer: number
  stockAvailable: number
  totalBudget: number

  // Deal Settings
  dealTitle: string
  startDate: string
  endDate: string
  featured: boolean
  limitedTime: boolean
  showCountdown: boolean
  allowPreorders: boolean
  dealTerms: string

  // Shipping & Delivery
  shippingMethods: string[]
  shippingCost: number
  freeShipping: boolean
  availableRegions: string[]
  localPickup: boolean
  handlingTime: string
  estimatedDelivery: string

  // Visibility & SEO
  dealStatus: string
  publishDate: string
  featuredHomepage: boolean
  seoTags: string
  metaDescription: string
  backInStockNotifications: boolean
}

export default function CreateDealPage() {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    images: [],
    sku: "",
    tags: [],
    brand: "",
    regularPrice: 0,
    groupPrice: 0,
    minGroupSize: 0,
    maxPerBuyer: 0,
    stockAvailable: 0,
    totalBudget: 0,
    dealTitle: "",
    startDate: "",
    endDate: "",
    featured: false,
    limitedTime: false,
    showCountdown: false,
    allowPreorders: false,
    dealTerms: "",
    shippingMethods: [],
    shippingCost: 0,
    freeShipping: false,
    availableRegions: [],
    localPickup: false,
    handlingTime: "",
    estimatedDelivery: "",
    dealStatus: "draft",
    publishDate: "",
    featuredHomepage: false,
    seoTags: "",
    metaDescription: "",
    backInStockNotifications: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentTag, setCurrentTag] = useState("")

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      handleInputChange("tags", [...formData.tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleInputChange("images", [...formData.images, ...files])
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    handleInputChange("images", newImages)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required field validation
    if (!formData.productName) newErrors.productName = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.longDescription) newErrors.longDescription = "Product description is required"
    if (formData.images.length === 0) newErrors.images = "At least one product image is required"
    if (!formData.regularPrice) newErrors.regularPrice = "Regular price is required"
    if (!formData.groupPrice) newErrors.groupPrice = "Group price is required"
    if (!formData.minGroupSize) newErrors.minGroupSize = "Minimum group size is required"
    if (!formData.stockAvailable) newErrors.stockAvailable = "Available stock is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.endDate) newErrors.endDate = "End date is required"

    // Business logic validation
    if (formData.groupPrice >= formData.regularPrice) {
      newErrors.groupPrice = "Group price must be less than regular price"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      // Handle form submission
    }
  }

  const handlePreview = () => {
    console.log("Preview deal:", formData)
    // Show preview modal or navigate to preview page
  }

  const discountPercentage =
    formData.regularPrice > 0
      ? Math.round(((formData.regularPrice - formData.groupPrice) / formData.regularPrice) * 100)
      : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-200 via-white to-secondary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <BackgroundElements />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            Create New Group-Buying Deal
          </h1>
          <p className="text-primary-500 dark:text-primary-300">
            Fill out the form below to create a new group deal for your product
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Info Section */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                <Package className="w-5 h-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-sm font-medium">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productName"
                  placeholder="Enter product title"
                  value={formData.productName}
                  onChange={(e) => handleInputChange("productName", e.target.value)}
                  className={errors.productName ? "border-red-500" : ""}
                />
                {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food-beverages">Food & Beverages</SelectItem>
                    <SelectItem value="health-beauty">Health & Beauty</SelectItem>
                    <SelectItem value="home-garden">Home & Garden</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing & Accessories</SelectItem>
                    <SelectItem value="books">Books & Media</SelectItem>
                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <Label htmlFor="shortDescription" className="text-sm font-medium">
                  Short Description
                </Label>
                <Input
                  id="shortDescription"
                  placeholder="One-sentence description (optional)"
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                />
              </div>

              {/* Long Description */}
              <div className="space-y-2">
                <Label htmlFor="longDescription" className="text-sm font-medium">
                  Product Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="longDescription"
                  placeholder="Enter full description..."
                  rows={4}
                  value={formData.longDescription}
                  onChange={(e) => handleInputChange("longDescription", e.target.value)}
                  className={errors.longDescription ? "border-red-500" : ""}
                />
                {errors.longDescription && <p className="text-red-500 text-sm">{errors.longDescription}</p>}
              </div>

              {/* Product Images */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Product Images <span className="text-red-500">*</span>
                  <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                </Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                  <div className="text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="images" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                          Click or drag to upload images
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">Recommended: 800×800px, JPG/PNG</span>
                      </label>
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Previews */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
              </div>

              {/* SKU and Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku" className="text-sm font-medium">
                    SKU/Model #
                  </Label>
                  <Input
                    id="sku"
                    placeholder="Product SKU"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-sm font-medium">
                    Brand
                  </Label>
                  <Input
                    id="brand"
                    placeholder="Brand name"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Tags
                  <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. eco-friendly, travel, etc."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Thresholds Section */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                <IndianRupee className="w-5 h-5" />
                Pricing & Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regularPrice" className="text-sm font-medium">
                    Regular Price (per unit) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="regularPrice"
                      type="number"
                      placeholder="0.00"
                      className={`pl-10 ${errors.regularPrice ? "border-red-500" : ""}`}
                      value={formData.regularPrice || ""}
                      onChange={(e) => handleInputChange("regularPrice", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  {errors.regularPrice && <p className="text-red-500 text-sm">{errors.regularPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupPrice" className="text-sm font-medium">
                    Group Price (per unit) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="groupPrice"
                      type="number"
                      placeholder="0.00"
                      className={`pl-10 ${errors.groupPrice ? "border-red-500" : ""}`}
                      value={formData.groupPrice || ""}
                      onChange={(e) => handleInputChange("groupPrice", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  {errors.groupPrice && <p className="text-red-500 text-sm">{errors.groupPrice}</p>}
                </div>
              </div>

              {/* Discount Display */}
              {discountPercentage > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    Discount: {discountPercentage}% off (₹{(formData.regularPrice - formData.groupPrice).toFixed(2)}{" "}
                    savings per unit)
                  </p>
                </div>
              )}

              {/* Thresholds */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minGroupSize" className="text-sm font-medium">
                    Goal Quantity (min buyers) <span className="text-red-500">*</span>
                    <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                  </Label>
                  <Input
                    id="minGroupSize"
                    type="number"
                    placeholder="Minimum buyers needed"
                    className={errors.minGroupSize ? "border-red-500" : ""}
                    value={formData.minGroupSize || ""}
                    onChange={(e) => handleInputChange("minGroupSize", Number.parseInt(e.target.value) || 0)}
                  />
                  {errors.minGroupSize && <p className="text-red-500 text-sm">{errors.minGroupSize}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPerBuyer" className="text-sm font-medium">
                    Max per Buyer
                    <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                  </Label>
                  <Input
                    id="maxPerBuyer"
                    type="number"
                    placeholder="No limit"
                    value={formData.maxPerBuyer || ""}
                    onChange={(e) => handleInputChange("maxPerBuyer", Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stockAvailable" className="text-sm font-medium">
                    Available Stock <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="stockAvailable"
                    type="number"
                    placeholder="Total units"
                    className={errors.stockAvailable ? "border-red-500" : ""}
                    value={formData.stockAvailable || ""}
                    onChange={(e) => handleInputChange("stockAvailable", Number.parseInt(e.target.value) || 0)}
                  />
                  {errors.stockAvailable && <p className="text-red-500 text-sm">{errors.stockAvailable}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deal Settings Section */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                <Settings className="w-5 h-5" />
                Deal Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Deal Title */}
              <div className="space-y-2">
                <Label htmlFor="dealTitle" className="text-sm font-medium">
                  Deal Title
                </Label>
                <Input
                  id="dealTitle"
                  placeholder="Auto-filled from product name"
                  value={formData.dealTitle || formData.productName}
                  onChange={(e) => handleInputChange("dealTitle", e.target.value)}
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    className={errors.startDate ? "border-red-500" : ""}
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                  {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-medium">
                    End Date (deadline) <span className="text-red-500">*</span>
                    <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                  </Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    className={errors.endDate ? "border-red-500" : ""}
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                  {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
                </div>
              </div>

              {/* Toggle Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Mark as Featured</Label>
                    <p className="text-xs text-gray-500">Highlight on site home/featured section</p>
                  </div>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Display live countdown</Label>
                    <p className="text-xs text-gray-500">Show countdown timer on deal page</p>
                  </div>
                  <Switch
                    checked={formData.showCountdown}
                    onCheckedChange={(checked) => handleInputChange("showCountdown", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Allow pre-orders if stock reaches zero</Label>
                    <p className="text-xs text-gray-500">Let customers join even if initial stock sells out</p>
                  </div>
                  <Switch
                    checked={formData.allowPreorders}
                    onCheckedChange={(checked) => handleInputChange("allowPreorders", checked)}
                  />
                </div>
              </div>

              {/* Deal Terms */}
              <div className="space-y-2">
                <Label htmlFor="dealTerms" className="text-sm font-medium">
                  Terms & Conditions
                </Label>
                <Textarea
                  id="dealTerms"
                  placeholder="Return policy, obligations, etc."
                  rows={3}
                  value={formData.dealTerms}
                  onChange={(e) => handleInputChange("dealTerms", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Delivery Section */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                <Truck className="w-5 h-5" />
                Shipping & Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shipping Options */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Shipping Methods <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shipping method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free Shipping</SelectItem>
                    <SelectItem value="flat">Flat Rate</SelectItem>
                    <SelectItem value="calculated">Calculated</SelectItem>
                    <SelectItem value="pickup">Local Pickup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Shipping Cost and Free Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingCost" className="text-sm font-medium">
                    Shipping Cost
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="shippingCost"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      disabled={formData.freeShipping}
                      value={formData.freeShipping ? 0 : formData.shippingCost || ""}
                      onChange={(e) => handleInputChange("shippingCost", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Free Shipping Available</Label>
                    <p className="text-xs text-gray-500">Toggle to enable free shipping</p>
                  </div>
                  <Switch
                    checked={formData.freeShipping}
                    onCheckedChange={(checked) => handleInputChange("freeShipping", checked)}
                  />
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="handlingTime" className="text-sm font-medium">
                    Handling Time (days)
                  </Label>
                  <Input
                    id="handlingTime"
                    placeholder="3-5 business days"
                    value={formData.handlingTime}
                    onChange={(e) => handleInputChange("handlingTime", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedDelivery" className="text-sm font-medium">
                    Estimated Delivery
                  </Label>
                  <Input
                    id="estimatedDelivery"
                    placeholder="Ships in 2 weeks"
                    value={formData.estimatedDelivery}
                    onChange={(e) => handleInputChange("estimatedDelivery", e.target.value)}
                  />
                </div>
              </div>

              {/* Local Pickup */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Enable Local Pickup</Label>
                  <p className="text-xs text-gray-500">Allow customers to pick up locally</p>
                </div>
                <Switch
                  checked={formData.localPickup}
                  onCheckedChange={(checked) => handleInputChange("localPickup", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Visibility & SEO Section */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                <Globe className="w-5 h-5" />
                Visibility & SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Deal Status */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Deal Status <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.dealStatus} onValueChange={(value) => handleInputChange("dealStatus", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Publish Date */}
              <div className="space-y-2">
                <Label htmlFor="publishDate" className="text-sm font-medium">
                  Schedule Publish Date
                </Label>
                <Input
                  id="publishDate"
                  type="datetime-local"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange("publishDate", e.target.value)}
                />
              </div>

              {/* SEO Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTags" className="text-sm font-medium">
                    SEO Tags/Keywords
                  </Label>
                  <Input
                    id="seoTags"
                    placeholder="e.g. eco, outdoor, camping"
                    value={formData.seoTags}
                    onChange={(e) => handleInputChange("seoTags", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription" className="text-sm font-medium">
                    Meta Description
                  </Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="Small description for search engines (max 160 chars)"
                    maxLength={160}
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  />
                  <p className="text-xs text-gray-500">{formData.metaDescription.length}/160 characters</p>
                </div>
              </div>

              {/* Additional Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Feature on Homepage</Label>
                    <p className="text-xs text-gray-500">Display prominently on homepage</p>
                  </div>
                  <Switch
                    checked={formData.featuredHomepage}
                    onCheckedChange={(checked) => handleInputChange("featuredHomepage", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Notify Customers if Restocked</Label>
                    <p className="text-xs text-gray-500">Send notifications when back in stock</p>
                  </div>
                  <Switch
                    checked={formData.backInStockNotifications}
                    onCheckedChange={(checked) => handleInputChange("backInStockNotifications", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4 -mx-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button type="button" variant="outline" onClick={handlePreview} className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview Deal
              </Button>
              <Button type="submit" className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Create Deal
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
