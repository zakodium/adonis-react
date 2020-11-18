import React from 'react';
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

  public render(Component: any, props?: Record<string, unknown>): string {
    return renderToStaticMarkup(
      // @ts-ignore
      <AdonisContextProvider value={this.context}>
        <Component {...props} />
      </AdonisContextProvider>,
    );
  }
}
