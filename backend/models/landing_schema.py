from pydantic import BaseModel, Field


class HeroSection(BaseModel):
    title: str = Field(..., min_length=1)
    subtitle: str = Field(..., min_length=1)
    requestBtn: str = Field(..., min_length=1)
    pricingBtn: str = Field(..., min_length=1)


class FeatureItem(BaseModel):
    id: int = Field(..., ge=1)
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    icon: str = Field(default="billing")  # Icon key: billing, inventory, reports, branch, support, analytics, security, settings
    active: bool


class PricingPlan(BaseModel):
    id: int = Field(..., ge=1)
    name: str = Field(..., min_length=1)
    price: int = Field(..., ge=0)
    popular: bool
    features: list[str] = Field(default_factory=list)


class DemoFormField(BaseModel):
    key: str = Field(..., min_length=1)
    label: str = Field(..., min_length=1)
    placeholder: str = Field(..., min_length=1)
    type: str = Field("text", min_length=1)
    required: bool = True


class DemoFormSection(BaseModel):
    title: str = Field(..., min_length=1)
    subtitle: str = Field(..., min_length=1)
    submitText: str = Field(..., min_length=1)
    fields: list[DemoFormField]


class FooterContactItem(BaseModel):
    type: str = Field(..., min_length=1)
    value: str = Field(..., min_length=1)


class FooterSocialLinkItem(BaseModel):
    platform: str = Field(..., min_length=1)
    url: str = Field(..., min_length=1)


class FooterSection(BaseModel):
    brandTitle: str = Field(..., min_length=1)
    brandSubtitle: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    socialLinksTitle: str = Field(..., min_length=1)
    socialLinks: list[FooterSocialLinkItem] = Field(default_factory=list)
    contactTitle: str = Field(..., min_length=1)
    contacts: list[FooterContactItem] = Field(default_factory=list)
    copyrightText: str = Field(..., min_length=1)


class LandingPageContent(BaseModel):
    hero: HeroSection
    features: list[FeatureItem] = Field(default_factory=list)
    pricing: list[PricingPlan] = Field(default_factory=list)
    demoForm: DemoFormSection
    footer: FooterSection
