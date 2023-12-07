from .challenge import *
from .crypto import *
from .forensics import *
from .chalenv import *
from .utils import *
from .web import *
from .phishing import *
from .reversing import *

challenge_types = {}
for c in GeneratedChallenge.__subclasses__():
    challenge_types[c.__name__] = c
for c in ChallengeEnvironment.__subclasses__():
    challenge_types[c.__name__] = c
