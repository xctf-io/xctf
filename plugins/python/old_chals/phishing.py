from .challenge import GeneratedChallenge
import os
from os.path import join
import shutil
from telnetlib import IP
from zipfile import ZipFile
import tempfile
import shutil
import binascii
import random
from fractions import Fraction


class PhishingDefenseChallenge(GeneratedChallenge):
    yaml_tag = u'!phishing_defense'
    __doc__ = """
    Find the phishing emails
    
    Config:
    
        None
    """

    # Returns an array of emails (.json) that start with a certain string (real_) or (fake_)
    def _gen_emails(self, chal_dir, num, must_start_with_string):

        email_dir = os.path.join(chal_dir, "chal_files/phishing_defense/")

        print("chal_dir : " + email_dir)
        possible_files = os.listdir(email_dir)

        # Filter List
        for item in possible_files:
            print("possible file: " + item)
            if not item.startswith(must_start_with_string):
                possible_files.remove(item)
            else:
                print("possible file chosen: " + item)

        generated_files = []

        # Populate Generated Files
        for x in range(num):
            # Note there is a possibility one file can be selected multiple times through random generator but I'm not gonna work on it now
            with open(os.path.join(email_dir, possible_files[random.randrange(0, len(possible_files))])) as f:
                generated_files.append(f.read())

        return generated_files

    def _temp_opener(self, name, flag, mode=0o777):
        print("tmpopener name : " + name)
        print("tmpopener flag : " + name)
        # return os.open(name, flag | os.O_TEMPORARY, mode)
        return os.open(name, os.O_TEMPORARY, mode)

    # Generator
    def gen(self, chal_dir):
        print("chal_zip")
        chal_zip = os.path.join(chal_dir, "chal")

        self.chal_file = "chal.zip"

        print("generating emails to array")
        # Generating emails to an array
        json_list = []
        json_list.extend(self._gen_emails(
            chal_dir, random.randrange(1, 3), "real_"))
        json_list.extend(self._gen_emails(
            chal_dir, random.randrange(0, 2), "fake_"))
        json_list.extend(self._gen_emails(
            chal_dir, random.randrange(1, 3), "real_"))

        print("writing all emails to directory")
        # Writing all emails in previous array to directory
        with tempfile.TemporaryDirectory() as chal_dir:
            for i in range(len(json_list)):
                filename = os.path.join(chal_dir, "email" + str(i) + ".json")
                with open(filename, 'w') as f:
                    print("item iterated " + str(i))
                    f.write(json_list[i])
                    f.flush()

                    with open(f.name, "rb", opener=self._temp_opener) as f:
                        assert f.read() == json_list[i]

                assert not os.path.exists(f.name)

        print("make archive")
        # chal dir is the out directory in this function
        shutil.make_archive(chal_zip, "zip", chal_dir)
