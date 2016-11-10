# -*- coding: utf-8 -*-

from __future__ import absolute_import

import pytest

from sentry.interfaces.base import InterfaceValidationError
from sentry.interfaces.repos import Repos
from sentry.testutils import TestCase


class ReposTest(TestCase):
    def test_serialize_behavior(self):
        assert Repos.to_python({
            '/path/to/sentry': {
                'name': 'sentry-unity',
            },
        }).to_json() == {
            '/path/to/sentry': {
                'name': 'sentry-unity',
            },
        }

    def test_missing_name(self):
        with pytest.raises(InterfaceValidationError):
            assert Repos.to_python({
                '/path/to/sentry': {},
            })

    def test_path(self):
        assert Repos().get_path() == 'repos'
