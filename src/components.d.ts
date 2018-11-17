/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/router';
import '@stencil/state-tunnel';
import 'ip-stencil-route-listener';
import {
  MatchResults,
} from '@stencil/router';


export namespace Components {

  interface AppHome {}
  interface AppHomeAttributes extends StencilHTMLAttributes {}

  interface AppPost {
    'match': MatchResults;
  }
  interface AppPostAttributes extends StencilHTMLAttributes {
    'match'?: MatchResults;
  }

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface PomCode {
    'code': string;
    'language': string;
  }
  interface PomCodeAttributes extends StencilHTMLAttributes {
    'code'?: string;
    'language'?: string;
  }

  interface PomHeaderIconItem {
    'icon': string;
    'url': string;
  }
  interface PomHeaderIconItemAttributes extends StencilHTMLAttributes {
    'icon'?: string;
    'url'?: string;
  }

  interface PomHeader {
    'blogSubtitle': string;
    'blogTitle': string;
    'showBack': boolean;
    'showPercentage': boolean;
  }
  interface PomHeaderAttributes extends StencilHTMLAttributes {
    'blogSubtitle'?: string;
    'blogTitle'?: string;
    'showBack'?: boolean;
    'showPercentage'?: boolean;
  }

  interface PomImage {
    'alt': string;
    'caption': string;
    'src': string;
  }
  interface PomImageAttributes extends StencilHTMLAttributes {
    'alt'?: string;
    'caption'?: string;
    'src'?: string;
  }

  interface PomShareButtons {
    'heading': string;
  }
  interface PomShareButtonsAttributes extends StencilHTMLAttributes {
    'heading'?: string;
  }

  interface PomTagsList {
    'tags': string[];
  }
  interface PomTagsListAttributes extends StencilHTMLAttributes {
    'tags'?: string[];
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppHome': Components.AppHome;
    'AppPost': Components.AppPost;
    'AppRoot': Components.AppRoot;
    'PomCode': Components.PomCode;
    'PomHeaderIconItem': Components.PomHeaderIconItem;
    'PomHeader': Components.PomHeader;
    'PomImage': Components.PomImage;
    'PomShareButtons': Components.PomShareButtons;
    'PomTagsList': Components.PomTagsList;
  }

  interface StencilIntrinsicElements {
    'app-home': Components.AppHomeAttributes;
    'app-post': Components.AppPostAttributes;
    'app-root': Components.AppRootAttributes;
    'pom-code': Components.PomCodeAttributes;
    'pom-header-icon-item': Components.PomHeaderIconItemAttributes;
    'pom-header': Components.PomHeaderAttributes;
    'pom-image': Components.PomImageAttributes;
    'pom-share-buttons': Components.PomShareButtonsAttributes;
    'pom-tags-list': Components.PomTagsListAttributes;
  }


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppPostElement extends Components.AppPost, HTMLStencilElement {}
  var HTMLAppPostElement: {
    prototype: HTMLAppPostElement;
    new (): HTMLAppPostElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLPomCodeElement extends Components.PomCode, HTMLStencilElement {}
  var HTMLPomCodeElement: {
    prototype: HTMLPomCodeElement;
    new (): HTMLPomCodeElement;
  };

  interface HTMLPomHeaderIconItemElement extends Components.PomHeaderIconItem, HTMLStencilElement {}
  var HTMLPomHeaderIconItemElement: {
    prototype: HTMLPomHeaderIconItemElement;
    new (): HTMLPomHeaderIconItemElement;
  };

  interface HTMLPomHeaderElement extends Components.PomHeader, HTMLStencilElement {}
  var HTMLPomHeaderElement: {
    prototype: HTMLPomHeaderElement;
    new (): HTMLPomHeaderElement;
  };

  interface HTMLPomImageElement extends Components.PomImage, HTMLStencilElement {}
  var HTMLPomImageElement: {
    prototype: HTMLPomImageElement;
    new (): HTMLPomImageElement;
  };

  interface HTMLPomShareButtonsElement extends Components.PomShareButtons, HTMLStencilElement {}
  var HTMLPomShareButtonsElement: {
    prototype: HTMLPomShareButtonsElement;
    new (): HTMLPomShareButtonsElement;
  };

  interface HTMLPomTagsListElement extends Components.PomTagsList, HTMLStencilElement {}
  var HTMLPomTagsListElement: {
    prototype: HTMLPomTagsListElement;
    new (): HTMLPomTagsListElement;
  };

  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement
    'app-post': HTMLAppPostElement
    'app-root': HTMLAppRootElement
    'pom-code': HTMLPomCodeElement
    'pom-header-icon-item': HTMLPomHeaderIconItemElement
    'pom-header': HTMLPomHeaderElement
    'pom-image': HTMLPomImageElement
    'pom-share-buttons': HTMLPomShareButtonsElement
    'pom-tags-list': HTMLPomTagsListElement
  }

  interface ElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-post': HTMLAppPostElement;
    'app-root': HTMLAppRootElement;
    'pom-code': HTMLPomCodeElement;
    'pom-header-icon-item': HTMLPomHeaderIconItemElement;
    'pom-header': HTMLPomHeaderElement;
    'pom-image': HTMLPomImageElement;
    'pom-share-buttons': HTMLPomShareButtonsElement;
    'pom-tags-list': HTMLPomTagsListElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
