import React from 'react';
import ProjectActions from '../../actions/projectActions';

const WaitingForApp = React.createClass({
  propTypes: {
    project: React.PropTypes.object,
    organization: React.PropTypes.object
  },

  componentDidMount() {
    setTimeout(() => {
      console.log('settimeout finished!');
      ProjectActions.updateSuccess({
        id: this.props.project.id,
        firstEvent: true
      });
    }, 2000);
  },

  render() {
    let project = this.props.project;
    let projectId = project.slug;
    let orgId = this.props.organization.id;
    if (!project.firstEvent) {
      console.log(project.firstEvent);
      return (
        <span className="btn btn-default" style={{background: 'yellow'}}>Waiting to hear from your app...</span>
      );
    } else {
      return (
        <a href={`/${orgId}/${projectId}/`} className="btn btn-default">Go to issues</a>
      );
    }
  }
});

const Platform = React.createClass({
  contextTypes: {
    project: React.PropTypes.object,
    organization: React.PropTypes.object
  },

  render() {
    let {project, organization} = this.context;

    return (
      <div>
        <h2>Install</h2>
        <WaitingForApp project={project} organization={organization}/>
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