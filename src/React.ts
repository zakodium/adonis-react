import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export function prepareReact(obj: Record<string, unknown>) {
  const instance = new ReactInstance();
  instance.share(obj);
  return instance;
}

class ReactInstance {
  private props: Record<string, unknown> = {};

  public share(obj: Record<string, unknown>): void {
    Object.assign(this.props, obj);
  }

  public render(Component: any, props?: Record<string, unknown>): string {
    return `
      <html>
        <head>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          ${renderToStaticMarkup(
            createElement(Component, { ...this.props, ...props }),
          )}
        </body>
      </html>
    `;
  }
}
