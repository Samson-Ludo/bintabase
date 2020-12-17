import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import '../sass/main.scss';
import Header from './Header';
import Subscribe from './Subscribe';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.title', null) && (_.get(this.props, 'pageContext.frontmatter.title', null) + ' - ')}{_.get(this.props, 'pageContext.site.siteMetadata.title', null)}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.excerpt', null) || _.get(this.props, 'pageContext.site.siteMetadata.description', null)}/>
                    <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,700%7CRoboto:400,400i,700,700i&display=swap" rel="stylesheet"/> 
                    {(_.get(this.props, 'pageContext.frontmatter.template', null) === 'post') && ( 
                    _.get(this.props, 'pageContext.frontmatter.canonical_url', null) && (
                    <link rel="canonical" href={_.get(this.props, 'pageContext.frontmatter.canonical_url', null)}/>
                    )
                    )}
                </Helmet>
                  <div id="page" className={'site layout-' + _.get(this.props, 'pageContext.site.siteMetadata.layout_style', null) + ' palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette', null)}>
                    <Header {...this.props} />
                    <div id="content" className="site-content outer">
                      <main id="main" className="site-main inner">
                        {this.props.children}
                      </main>
                    </div>
                    {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_subscribe', null) && (
                      <Subscribe {...this.props} />
                    )}
                    <Footer {...this.props} />
                  </div>
            </React.Fragment>
        );
    }
}
