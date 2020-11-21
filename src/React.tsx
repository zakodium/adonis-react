import React, { ComponentPropsWithoutRef, ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import {
  RouterContract,
  MakeUrlOptions,
  MakeSignedUrlOptions,
} from '@ioc:Adonis/Core/Route';

import { AdonisContextProvider } from './adonisContext';

export function prepareReact(
  ctx: HttpContextContract,
  app: ApplicationContract,
  Route: RouterContract,
) {
  const instance = new ReactInstance();
  instance.share({
    app,
    ctx,
    request: ctx.request,
    params: ctx.params,
    route: ctx.route,
    makeUrl: (
      routeIdentifier: string,
      options?: MakeUrlOptions,
      domain?: string,
    ) => {
      const url = Route.makeUrl(routeIdentifier, options, domain);
      if (!url) {
        throw new Error(`Route ${routeIdentifier} does not exist`);
      }
      return url;
    },
    makeSignedUrl: (
      routeIdentifier: string,
      options?: MakeSignedUrlOptions,
      domain?: string,
    ) => {
      const url = Route.makeSignedUrl(routeIdentifier, options, domain);
      if (!url) {
        throw new Error(`Route ${routeIdentifier} does not exist`);
      }
      return url;
    },
  });
  return instance;
}

class ReactInstance {
  private context: Record<string, unknown> = {};

  public share(obj: Record<string, unknown>): void {
    Object.assign(this.context, obj);
  }

  public render<T>(
    Component: ComponentType<T>,
    props?: ComponentPropsWithoutRef<ComponentType<T>>,
  ): string {
    const html = renderToStaticMarkup(
      // @ts-ignore
      <AdonisContextProvider value={this.context}>
        {/* @ts-ignore */}
        <Component {...props} />
      </AdonisContextProvider>,
    );
    return `<!DOCTYPE html>\n${html}`;
  }
}
