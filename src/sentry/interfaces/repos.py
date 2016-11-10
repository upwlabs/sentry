from __future__ import absolute_import

__all__ = ('Repos',)

import six

from sentry.interfaces.base import Interface, InterfaceValidationError
from sentry.utils.safe import trim


class Repos(Interface):
    """
    Details about repositories connected to an event.

    This is primarily used to aid with mapping the application code's filepath
    to the equivilent path inside of a repository.

    >>> {
    >>>     "/abs/path/to/sentry": {
    >>>         "name": "getsentry/sentry",
    >>>         "prefix": "src",
    >>>         "revision": "..." // optional
    >>>     }
    >>> }
    """
    @classmethod
    def to_python(cls, data):
        result = {}
        for path, config in six.iteritems(data):
            # 200 chars is enforced by db, and while we dont validate if the
            # repo actually exists, we know it could *never* exist if its beyond
            # the schema constraints.
            name = data.get('name')
            if not name:
                raise InterfaceValidationError("A repository must provide a value `name`")
            if len(name) > 200:
                raise InterfaceValidationError("Invalid repository `name`")
            if len(path) > 200:
                raise InterfaceValidationError("Invalid repository `path` (> 200 characters)")
            result[name] = {
                'name': name,
                'prefix': trim(data.get('prefix'), 200),
                'revision': trim(data.get('revision'), 40),
            }
        return cls(**result)

    def get_path(self):
        return 'repos'
