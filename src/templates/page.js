import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {htmlToReact, withPrefix} from '../utils';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Page extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <article className="post page post-full">
                <header className="post-header inner-md">
                  <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
                  {_.get(this.props, 'pageContext.frontmatter.subtitle', null) && (
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle', null))}
                  </div>
                  )}
                </header>
                {_.get(this.props, 'pageContext.frontmatter.img_path', null) && (
                <div className="post-thumbnail">
                  <img className="thumbnail" src={withPrefix(_.get(this.props, 'pageContext.frontmatter.img_path', null))} alt={_.get(this.props, 'pageContext.frontmatter.title', null)} />
                </div>
                )}
                <div className="post-content inner-md">
                  {htmlToReact(_.get(this.props, 'pageContext.html', null))}
                </div>
              </article>
            </Layout>
        );
    }
}
