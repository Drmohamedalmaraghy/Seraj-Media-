import type { Schema, Struct } from "@strapi/strapi"

export interface ElementsContactsCard extends Struct.ComponentSchema {
  collectionName: "components_elements_contacts_cards"
  info: {
    displayName: "ContactsCard"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    title: Schema.Attribute.String
  }
}

export interface ElementsFooterItem extends Struct.ComponentSchema {
  collectionName: "components_elements_footer_items"
  info: {
    description: ""
    displayName: "FooterItem"
  }
  attributes: {
    description: Schema.Attribute.Text
    links: Schema.Attribute.Component<"utilities.link", true>
    title: Schema.Attribute.String
  }
}

export interface ElementsIdealLocationsItem extends Struct.ComponentSchema {
  collectionName: "components_elements_ideal_locations_items"
  info: {
    displayName: "IdealLocationsItem"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    gridSize: Schema.Attribute.Enumeration<["one", "two", "three", "four"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"one">
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    title: Schema.Attribute.String
  }
}

export interface ElementsIndustriesItem extends Struct.ComponentSchema {
  collectionName: "components_elements_industries_items"
  info: {
    displayName: "IndustriesItem"
  }
  attributes: {
    description: Schema.Attribute.Text
    icon: Schema.Attribute.Component<"utilities.basic-image", false>
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface ElementsSolutionsItem extends Struct.ComponentSchema {
  collectionName: "components_elements_solutions_items"
  info: {
    displayName: "SolutionsItem"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    name: Schema.Attribute.String
    title: Schema.Attribute.String
  }
}

export interface ElementsStatisticItem extends Struct.ComponentSchema {
  collectionName: "components_elements_statistic_items"
  info: {
    displayName: "StatisticItem"
  }
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface ElementsTeammate extends Struct.ComponentSchema {
  collectionName: "components_elements_teammates"
  info: {
    displayName: "Teammate"
  }
  attributes: {
    name: Schema.Attribute.String
    photo: Schema.Attribute.Component<"utilities.basic-image", false>
    post: Schema.Attribute.String
  }
}

export interface ElementsTextImageItem extends Struct.ComponentSchema {
  collectionName: "components_elements_text_image_items"
  info: {
    displayName: "TextImageItem"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    title: Schema.Attribute.String
  }
}

export interface ElementsTimeLineItem extends Struct.ComponentSchema {
  collectionName: "components_elements_time_line_items"
  info: {
    displayName: "TimeLineItem"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    title: Schema.Attribute.String
  }
}

export interface SectionsArticleColumnContent extends Struct.ComponentSchema {
  collectionName: "components_sections_article_column_contents"
  info: {
    description: ""
    displayName: "ArticleColumnContent"
  }
  attributes: {
    columns: Schema.Attribute.Component<"sections.article-content", true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 2
          min: 2
        },
        number
      >
  }
}

export interface SectionsArticleContent extends Struct.ComponentSchema {
  collectionName: "components_sections_article_contents"
  info: {
    description: ""
    displayName: "ArticleContent"
  }
  attributes: {
    anchorTitle: Schema.Attribute.Text
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    mediaPosition: Schema.Attribute.Enumeration<
      ["before_title", "after_title", "bottom"]
    > &
      Schema.Attribute.Required
    medias: Schema.Attribute.Component<"utilities.multi-media", true>
  }
}

export interface SectionsArticlesCollection extends Struct.ComponentSchema {
  collectionName: "components_sections_articles_collections"
  info: {
    displayName: "ArticlesCollection"
  }
  attributes: {
    filterPlaceholder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Filter by tags">
    searchPlaceholder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Search">
    type: Schema.Attribute.Enumeration<["news", "blog"]> &
      Schema.Attribute.Required
  }
}

export interface SectionsBanner extends Struct.ComponentSchema {
  collectionName: "components_sections_banners"
  info: {
    displayName: "Banner"
  }
  attributes: {
    backgroundImage: Schema.Attribute.Component<"utilities.basic-image", false>
    button: Schema.Attribute.Component<"utilities.button", false>
    title: Schema.Attribute.Component<"utilities.ck-editor-content", false>
    topDescription: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
  }
}

export interface SectionsCarousel extends Struct.ComponentSchema {
  collectionName: "components_sections_carousels"
  info: {
    description: ""
    displayName: "Carousel"
  }
  attributes: {
    images: Schema.Attribute.Component<"utilities.basic-image", true>
  }
}

export interface SectionsContactUsForm extends Struct.ComponentSchema {
  collectionName: "components_sections_contact_us_forms"
  info: {
    displayName: "ContactUsForm"
  }
  attributes: {
    businessField: Schema.Attribute.Component<"utilities.form-field", false>
    descriptionField: Schema.Attribute.Component<"utilities.form-field", false>
    mailField: Schema.Attribute.Component<"utilities.form-field", false>
    nameField: Schema.Attribute.Component<"utilities.form-field", false>
    submitButton: Schema.Attribute.Component<"utilities.button", false>
    title: Schema.Attribute.String
  }
}

export interface SectionsContacts extends Struct.ComponentSchema {
  collectionName: "components_sections_contacts"
  info: {
    description: ""
    displayName: "Contacts"
  }
  attributes: {
    cards: Schema.Attribute.Component<"elements.contacts-card", true>
    customMapPin: Schema.Attribute.Component<"utilities.basic-image", false>
    form: Schema.Attribute.Component<"sections.contact-us-form", false>
    mapZoom: Schema.Attribute.Integer
    pinLatitude: Schema.Attribute.Float
    pinLongitude: Schema.Attribute.Float
  }
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: "components_sections_heroes"
  info: {
    description: ""
    displayName: "Hero"
  }
  attributes: {
    backgroundMedia: Schema.Attribute.Component<"utilities.multi-media", false>
    botDescription: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    button: Schema.Attribute.Component<"utilities.button", false>
    isWithFilters: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>
    titles: Schema.Attribute.Component<"utilities.text", true> &
      Schema.Attribute.Required
    titlesSize: Schema.Attribute.Enumeration<["small", "medium", "large"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"medium">
    topDescription: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
  }
}

export interface SectionsIdealLocations extends Struct.ComponentSchema {
  collectionName: "components_sections_ideal_locations"
  info: {
    displayName: "IdealLocations"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    items: Schema.Attribute.Component<"elements.ideal-locations-item", true>
    note: Schema.Attribute.Component<"utilities.ck-editor-content", false>
    title: Schema.Attribute.String
    video: Schema.Attribute.Component<"utilities.basic-video", false>
  }
}

export interface SectionsIndustries extends Struct.ComponentSchema {
  collectionName: "components_sections_industries"
  info: {
    displayName: "Industries"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    items: Schema.Attribute.Component<"elements.industries-item", true> &
      Schema.Attribute.Required
    title: Schema.Attribute.Component<"utilities.ck-editor-content", false>
  }
}

export interface SectionsLocationsView extends Struct.ComponentSchema {
  collectionName: "components_sections_locations_views"
  info: {
    description: ""
    displayName: "LocationsView"
  }
  attributes: {
    all: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"All">
    bookButton: Schema.Attribute.Component<"utilities.button", false> &
      Schema.Attribute.Required
    catalogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Catalog">
    cityTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"City">
    continueTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Continue">
    initialLatitude: Schema.Attribute.Float & Schema.Attribute.Required
    initialLongitude: Schema.Attribute.Float & Schema.Attribute.Required
    initialZoom: Schema.Attribute.Integer & Schema.Attribute.Required
    mapTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Map">
    regionTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Region">
    seeDetailsButton: Schema.Attribute.Component<"utilities.button", false> &
      Schema.Attribute.Required
    sizeTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Size">
    typeTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Type">
  }
}

export interface SectionsMainLocations extends Struct.ComponentSchema {
  collectionName: "components_sections_main_locations"
  info: {
    description: ""
    displayName: "MainLocations"
  }
  attributes: {
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<"plugin::color-picker.color"> &
      Schema.Attribute.DefaultTo<"#EC2426">
    buttons: Schema.Attribute.Component<"utilities.button", true>
    contactUsLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Contact For Booking">
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    itemsCount: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<3>
    note: Schema.Attribute.Component<"utilities.ck-editor-content", false>
    seeDetailsLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"See Details">
    title: Schema.Attribute.Component<"utilities.ck-editor-content", false>
  }
}

export interface SectionsNews extends Struct.ComponentSchema {
  collectionName: "components_sections_news"
  info: {
    displayName: "News"
  }
  attributes: {
    button: Schema.Attribute.Component<"utilities.button", false>
    itemsCount: Schema.Attribute.Integer
    title: Schema.Attribute.String
  }
}

export interface SectionsOnePageHelper extends Struct.ComponentSchema {
  collectionName: "components_sections_one_page_helpers"
  info: {
    description: ""
    displayName: "OnePageHelper"
  }
  attributes: {
    alsoInterested: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Might also be interested in">
    contactUsLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Contact For Booking">
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    next: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Next">
    prev: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Prev">
    screenInfo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Screen Information">
    seeDetails: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"See Details">
    seeMore: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"See more">
  }
}

export interface SectionsSolutions extends Struct.ComponentSchema {
  collectionName: "components_sections_solutions"
  info: {
    displayName: "Solutions"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    items: Schema.Attribute.Component<"elements.solutions-item", true>
    note: Schema.Attribute.Component<"utilities.ck-editor-content", false>
    title: Schema.Attribute.String
  }
}

export interface SectionsStatistics extends Struct.ComponentSchema {
  collectionName: "components_sections_statistics"
  info: {
    description: ""
    displayName: "Statistics"
  }
  attributes: {
    items: Schema.Attribute.Component<"elements.statistic-item", true> &
      Schema.Attribute.Required
  }
}

export interface SectionsTeam extends Struct.ComponentSchema {
  collectionName: "components_sections_teams"
  info: {
    displayName: "Team"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    items: Schema.Attribute.Component<"elements.teammate", true>
    nextLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<"Next">
    prevLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<"Prev">
    title: Schema.Attribute.String
  }
}

export interface SectionsText extends Struct.ComponentSchema {
  collectionName: "components_sections_texts"
  info: {
    displayName: "Text"
  }
  attributes: {
    buttons: Schema.Attribute.Component<"utilities.button", true>
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    text: Schema.Attribute.String
  }
}

export interface SectionsTextImage extends Struct.ComponentSchema {
  collectionName: "components_sections_text_images"
  info: {
    description: ""
    displayName: "TextImage"
  }
  attributes: {
    description: Schema.Attribute.Component<
      "utilities.ck-editor-content",
      false
    >
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    items: Schema.Attribute.Component<"elements.text-image-item", true>
    title: Schema.Attribute.Component<"utilities.ck-editor-content", false>
  }
}

export interface SectionsTimeLine extends Struct.ComponentSchema {
  collectionName: "components_sections_time_lines"
  info: {
    displayName: "TimeLine"
  }
  attributes: {
    items: Schema.Attribute.Component<"elements.time-line-item", true>
  }
}

export interface SeoUtilitiesMetaSocial extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_meta_socials"
  info: {
    displayName: "metaSocial"
    icon: "project-diagram"
  }
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required
    image: Schema.Attribute.Media<"images" | "files" | "videos">
    socialNetwork: Schema.Attribute.Enumeration<["Facebook", "Twitter"]> &
      Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SeoUtilitiesSeo extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_seos"
  info: {
    description: ""
    displayName: "seo"
    icon: "search"
  }
  attributes: {
    applicationName: Schema.Attribute.String
    canonicalUrl: Schema.Attribute.String
    email: Schema.Attribute.String
    keywords: Schema.Attribute.Text
    metaDescription: Schema.Attribute.String
    metaImage: Schema.Attribute.Media<"images">
    metaRobots: Schema.Attribute.Enumeration<
      [
        "all",
        "index",
        "index,follow",
        "noindex",
        "noindex,follow",
        "noindex,nofollow",
        "none",
        "noarchive",
        "nosnippet",
        "max-snippet",
      ]
    > &
      Schema.Attribute.DefaultTo<"all">
    metaTitle: Schema.Attribute.String
    og: Schema.Attribute.Component<"seo-utilities.seo-og", false>
    siteName: Schema.Attribute.String
    structuredData: Schema.Attribute.JSON
    twitter: Schema.Attribute.Component<"seo-utilities.seo-twitter", false>
  }
}

export interface SeoUtilitiesSeoOg extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_seo_ogs"
  info: {
    displayName: "SeoOg"
    icon: "oneToMany"
  }
  attributes: {
    description: Schema.Attribute.String
    image: Schema.Attribute.Media<"images">
    title: Schema.Attribute.String
    type: Schema.Attribute.Enumeration<["website", "article"]> &
      Schema.Attribute.DefaultTo<"website">
    url: Schema.Attribute.String
  }
}

export interface SeoUtilitiesSeoTwitter extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_seo_twitters"
  info: {
    displayName: "SeoTwitter"
    icon: "oneToMany"
  }
  attributes: {
    card: Schema.Attribute.String
    creator: Schema.Attribute.String
    creatorId: Schema.Attribute.String
    description: Schema.Attribute.String
    images: Schema.Attribute.Media<"images", true>
    siteId: Schema.Attribute.String
    title: Schema.Attribute.String
  }
}

export interface SeoUtilitiesSocialIcons extends Struct.ComponentSchema {
  collectionName: "components_seo_utilities_social_icons"
  info: {
    displayName: "SocialIcons"
  }
  attributes: {
    socials: Schema.Attribute.Component<"utilities.image-with-link", true>
    title: Schema.Attribute.String
  }
}

export interface UtilitiesArticleHelper extends Struct.ComponentSchema {
  collectionName: "components_utilities_article_helpers"
  info: {
    displayName: "ArticleHelper"
  }
  attributes: {
    articleShareText: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Schema.Attribute.DefaultTo<"Share">
    articleTopPostsText: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Schema.Attribute.DefaultTo<"Top posts">
    isArticleTopPost: Schema.Attribute.Boolean
  }
}

export interface UtilitiesBasicImage extends Struct.ComponentSchema {
  collectionName: "components_utilities_basic_images"
  info: {
    displayName: "BasicImage"
  }
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required
    fallbackSrc: Schema.Attribute.String
    height: Schema.Attribute.Integer
    media: Schema.Attribute.Media<"images" | "videos"> &
      Schema.Attribute.Required
    width: Schema.Attribute.Integer
  }
}

export interface UtilitiesBasicVideo extends Struct.ComponentSchema {
  collectionName: "components_utilities_basic_videos"
  info: {
    displayName: "BasicVideo"
  }
  attributes: {
    uploadedVideo: Schema.Attribute.Media<"files" | "videos">
    youtubeUrl: Schema.Attribute.Text
  }
}

export interface UtilitiesButton extends Struct.ComponentSchema {
  collectionName: "components_utilities_buttons"
  info: {
    description: ""
    displayName: "Button"
  }
  attributes: {
    href: Schema.Attribute.Text
    icon: Schema.Attribute.Component<"utilities.basic-image", false>
    label: Schema.Attribute.String
    newTab: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>
    variant: Schema.Attribute.Enumeration<["primary", "secondary"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"primary">
  }
}

export interface UtilitiesCkEditorContent extends Struct.ComponentSchema {
  collectionName: "components_utilities_ck_editor_contents"
  info: {
    displayName: "CkEditorContent"
  }
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        "plugin::ckeditor5.CKEditor",
        {
          preset: "defaultCkEditor"
        }
      >
  }
}

export interface UtilitiesFormField extends Struct.ComponentSchema {
  collectionName: "components_utilities_form_fields"
  info: {
    displayName: "FormField"
  }
  attributes: {
    label: Schema.Attribute.String
    placeholder: Schema.Attribute.String
    requiredErrorText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"This filed is required">
  }
}

export interface UtilitiesImageWithLink extends Struct.ComponentSchema {
  collectionName: "components_utilities_image_with_links"
  info: {
    description: ""
    displayName: "ImageWithLink"
  }
  attributes: {
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    link: Schema.Attribute.Component<"utilities.link", false>
  }
}

export interface UtilitiesLink extends Struct.ComponentSchema {
  collectionName: "components_utilities_links"
  info: {
    displayName: "Link"
  }
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required
    label: Schema.Attribute.String & Schema.Attribute.Required
    newTab: Schema.Attribute.Boolean
  }
}

export interface UtilitiesMultiMedia extends Struct.ComponentSchema {
  collectionName: "components_utilities_multi_medias"
  info: {
    displayName: "MultiMedia"
  }
  attributes: {
    image: Schema.Attribute.Component<"utilities.basic-image", false>
    video: Schema.Attribute.Component<"utilities.basic-video", false>
  }
}

export interface UtilitiesText extends Struct.ComponentSchema {
  collectionName: "components_utilities_texts"
  info: {
    displayName: "Text"
  }
  attributes: {
    text: Schema.Attribute.String
  }
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "elements.contacts-card": ElementsContactsCard
      "elements.footer-item": ElementsFooterItem
      "elements.ideal-locations-item": ElementsIdealLocationsItem
      "elements.industries-item": ElementsIndustriesItem
      "elements.solutions-item": ElementsSolutionsItem
      "elements.statistic-item": ElementsStatisticItem
      "elements.teammate": ElementsTeammate
      "elements.text-image-item": ElementsTextImageItem
      "elements.time-line-item": ElementsTimeLineItem
      "sections.article-column-content": SectionsArticleColumnContent
      "sections.article-content": SectionsArticleContent
      "sections.articles-collection": SectionsArticlesCollection
      "sections.banner": SectionsBanner
      "sections.carousel": SectionsCarousel
      "sections.contact-us-form": SectionsContactUsForm
      "sections.contacts": SectionsContacts
      "sections.hero": SectionsHero
      "sections.ideal-locations": SectionsIdealLocations
      "sections.industries": SectionsIndustries
      "sections.locations-view": SectionsLocationsView
      "sections.main-locations": SectionsMainLocations
      "sections.news": SectionsNews
      "sections.one-page-helper": SectionsOnePageHelper
      "sections.solutions": SectionsSolutions
      "sections.statistics": SectionsStatistics
      "sections.team": SectionsTeam
      "sections.text": SectionsText
      "sections.text-image": SectionsTextImage
      "sections.time-line": SectionsTimeLine
      "seo-utilities.meta-social": SeoUtilitiesMetaSocial
      "seo-utilities.seo": SeoUtilitiesSeo
      "seo-utilities.seo-og": SeoUtilitiesSeoOg
      "seo-utilities.seo-twitter": SeoUtilitiesSeoTwitter
      "seo-utilities.social-icons": SeoUtilitiesSocialIcons
      "utilities.article-helper": UtilitiesArticleHelper
      "utilities.basic-image": UtilitiesBasicImage
      "utilities.basic-video": UtilitiesBasicVideo
      "utilities.button": UtilitiesButton
      "utilities.ck-editor-content": UtilitiesCkEditorContent
      "utilities.form-field": UtilitiesFormField
      "utilities.image-with-link": UtilitiesImageWithLink
      "utilities.link": UtilitiesLink
      "utilities.multi-media": UtilitiesMultiMedia
      "utilities.text": UtilitiesText
    }
  }
}
