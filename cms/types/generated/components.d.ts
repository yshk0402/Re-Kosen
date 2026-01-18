import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleBlocks extends Struct.ComponentSchema {
  collectionName: 'components_article_blocks';
  info: {
    displayName: 'blocks';
  };
  attributes: {};
}

export interface ArticleCallout extends Struct.ComponentSchema {
  collectionName: 'components_article_callouts';
  info: {
    displayName: 'Callout';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['info', 'success', 'warning', 'danger']
    > &
      Schema.Attribute.DefaultTo<'info'>;
  };
}

export interface ArticleComparisonTable extends Struct.ComponentSchema {
  collectionName: 'components_article_comparison_tables';
  info: {
    displayName: 'Comparison Table';
  };
  attributes: {
    table_data: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface ArticleCta extends Struct.ComponentSchema {
  collectionName: 'components_article_ctas';
  info: {
    displayName: 'Cta';
  };
  attributes: {
    description: Schema.Attribute.Text;
    link_text: Schema.Attribute.String;
    link_url: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArticleHeading extends Struct.ComponentSchema {
  collectionName: 'components_article_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    level: Schema.Attribute.Enumeration<['h1', 'h2', 'h3', 'h4', 'h5', 'h6']> &
      Schema.Attribute.DefaultTo<'h2'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArticleImage extends Struct.ComponentSchema {
  collectionName: 'components_article_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    alt_text: Schema.Attribute.String & Schema.Attribute.Required;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ArticleLinkCard extends Struct.ComponentSchema {
  collectionName: 'components_article_link_cards';
  info: {
    displayName: 'Link Card';
  };
  attributes: {
    cards: Schema.Attribute.Component<'article.link-card-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ArticleLinkCardItem extends Struct.ComponentSchema {
  collectionName: 'components_article_link_card_items';
  info: {
    displayName: 'Link Card Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArticleProsCon extends Struct.ComponentSchema {
  collectionName: 'components_article_pros_cons';
  info: {
    displayName: 'Pros Con';
  };
  attributes: {
    cons: Schema.Attribute.Component<'article.rich-text', true>;
    pros: Schema.Attribute.Component<'article.rich-text', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArticleRichText extends Struct.ComponentSchema {
  collectionName: 'components_article_rich_texts';
  info: {
    displayName: 'Rich Text';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface ArticleSeo extends Struct.ComponentSchema {
  collectionName: 'components_article_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {};
}

export interface ArticleSummaryCard extends Struct.ComponentSchema {
  collectionName: 'components_article_summary_cards';
  info: {
    displayName: 'Summary Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    desktopImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    linkUrl: Schema.Attribute.String & Schema.Attribute.Required;
    mobileImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface HomeLineCta extends Struct.ComponentSchema {
  collectionName: 'components_home_line_ctas';
  info: {
    displayName: 'LineCta';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'無料で相談する'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    lineUrl: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article.blocks': ArticleBlocks;
      'article.callout': ArticleCallout;
      'article.comparison-table': ArticleComparisonTable;
      'article.cta': ArticleCta;
      'article.heading': ArticleHeading;
      'article.image': ArticleImage;
      'article.link-card': ArticleLinkCard;
      'article.link-card-item': ArticleLinkCardItem;
      'article.pros-con': ArticleProsCon;
      'article.rich-text': ArticleRichText;
      'article.seo': ArticleSeo;
      'article.summary-card': ArticleSummaryCard;
      'home.banner': HomeBanner;
      'home.line-cta': HomeLineCta;
    }
  }
}
