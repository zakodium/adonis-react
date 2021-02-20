import React, { ComponentPropsWithoutRef, ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { RouterContract } from '@ioc:Adonis/Core/Route';

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
    makeUrl(...args: Parameters<typeof Route.makeUrl>) {
      return Route.makeUrl(...args);
    },
    makeSignedUrl: (...args: Parameters<typeof Route.makeSignedUrl>) => {
      return Route.makeSignedUrl(...args);
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
      // @ts-expect-error Context is filled outside of this class
      <AdonisContextProvider value={this.context}>
        {/* @ts-expect-error Unsure why this errors */}
        <Component {...props} />
      </AdonisContextProvider>,
    );
    return `<!DOCTYPE html>\n${html}`;
  }
}
