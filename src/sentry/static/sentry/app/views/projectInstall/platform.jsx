import React from 'react';

const WaitingForApp = React.createClass({
  propTypes: {
    projectId: React.PropTypes.string,
    orgId: React.PropTypes.string
  },

  render() {
    return (
      <span style={{background: 'yellow'}}>Waiting to hear from your app...</span>
    );
  }
});

const Platform = React.createClass({
  contextTypes: {
    project: React.PropTypes.object
  },

  render() {
    let {project, organization} = this.context;

    return (
      <div>
        <h2>Install</h2>
        <WaitingForApp projectId={project.slug} orgId={organization.slug}/>
        <ol>
          <li>
            <h4>Get the Laravel SDK</h4>
            <pre>$ composer require sentry/sentry-laravel</pre>
          </li>
          <li>
            <h4>Add the Sentry service provider...</h4>
            <pre>'providers' => array(
    // ...
    Sentry\SentryLaravel\SentryLaravelServiceProvider::class,
)

'aliases' => array(
    // ...
    'Sentry' => Sentry\SentryLaravel\SentryFacade::class,
)</pre>
          </li>
          <li>
            <h4>Add Sentry reporting...</h4>
            <pre>public function report(Exception $e)
{'{'}
    if ($this->shouldReport($e)) {'{'}
        app('sentry')->captureException($e);
    {'}'}
    parent::report($e);
{'}'}</pre>
          </li>
        </ol>
      </div>
   );
  }
});

export default Platform;