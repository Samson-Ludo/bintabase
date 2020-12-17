import React from 'react';
import _ from 'lodash';

export default class SubscribeForm extends React.Component {
    render() {
        return (
            <form name="subscribeForm"{...(_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_action', null) ? ({action: _.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_action', null)}) : null)} method="POST" data-netlify-honeypot="bot-field" data-netlify="true" className="subscribe-form">
              <div className="screen-reader-text">
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </div>
              <div className="form-group">
                <label>
                  <span className="screen-reader-text">Email address</span>
                  <input type="email" name="email" placeholder="Your email address" required/>
                </label>
              </div>
              <input type="hidden" name="form-name" value="subscribeForm" />
              <button className="button" type="submit">Subscribe</button>
            </form>
        );
    }
}
