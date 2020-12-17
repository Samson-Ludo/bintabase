import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {markdownify, Link, withPrefix, classNames, getPages} from '../utils';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Home extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
              {_.get(this.props, 'pageContext.frontmatter.has_intro', null) && (
              <div className="intro">
                <div className="inner-md">
                  {_.get(this.props, 'pageContext.frontmatter.intro_content', null) && (
                  <div className="intro-text">
                    {markdownify(_.get(this.props, 'pageContext.frontmatter.intro_content', null))}
                  </div>
                  )}
                  {_.get(this.props, 'pageContext.frontmatter.intro_actions', null) && (
                  <div className="intro-cta">
                    {_.map(_.get(this.props, 'pageContext.frontmatter.intro_actions', null), (action, action_idx) => (
                    <Link key={action_idx} to={withPrefix(_.get(action, 'url', null))} className={classNames({'button': (_.get(action, 'style', null) === 'primary') || (_.get(action, 'style', null) === 'secondary'), 'button-secondary': _.get(action, 'style', null) === 'secondary'})} {...(_.get(action, 'new_window', null) ? ({target: '_blank', rel: 'noopener'}) : null)}>{_.get(action, 'label', null)}</Link>
                    ))}
                  </div>
                  )}
                </div>
              </div>
              )}
              <div className="post-feed">
                {_.map(display_posts, (post, post_idx) => (
                <article key={post_idx} className="post post-card">
                  <div className="post-card-inside">
                    {_.get(post, 'frontmatter.thumb_img_path', null) && (
                    <Link className="post-card-thumbnail" to={withPrefix(_.get(post, 'url', null))}>
                      <img className="thumbnail" src={withPrefix(_.get(post, 'frontmatter.thumb_img_path', null))} alt={_.get(post, 'frontmatter.title', null)} />
                    </Link>
                    )}
                    <div className="post-card-content">
                      <header className="post-header">
                        <div className="post-meta">
                          <time className="published"
                          dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                        </div>
                        <h2 className="post-title"><Link to={withPrefix(_.get(post, 'url', null))} rel="bookmark">{_.get(post, 'frontmatter.title', null)}</Link></h2>
                      </header>
                      <div className="post-excerpt">
                        {_.get(post, 'frontmatter.excerpt', null) && (
                        <p>{_.get(post, 'frontmatter.excerpt', null)}</p>
                        )}
                        {((_.get(this.props, 'pageContext.frontmatter.has_more_link', null) === true) && _.get(this.props, 'pageContext.frontmatter.more_link_text', null)) && (
                        <p className="read-more">
                          <Link className="button button-secondary" to={withPrefix(_.get(post, 'url', null))}>{_.get(this.props, 'pageContext.frontmatter.more_link_text', null)}</Link>
                        </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
                ))}
              </div>
            </Layout>
        );
    }
}
