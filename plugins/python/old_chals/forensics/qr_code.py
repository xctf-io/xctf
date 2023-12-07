import os
import qrcode
from PIL import Image
from ..challenge import GeneratedChallenge


class BrokenQRCode(GeneratedChallenge):
    # TODO (cthompson) break qr code
    yaml_tag = u'!broken_qrcode'
    __doc__ = """
    Fix a broken QR code

    Config:

        fluff - some text fluff to include in the challenge
    """

    def gen(self, chal_dir):
        fluff = self.get_value("fluff")
        out_file = 'qrcode.png'

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(fluff + self.flag)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        img.save(os.path.join(chal_dir, out_file))

        self.chal_file = out_file


class QRCodeChallenge(GeneratedChallenge):
    # TODO (cthompson) break qr code
    yaml_tag = u'!qrcode'
    __doc__ = """
    Create a QR Code with 

    Config:
    
        fluff - some text fluff to include in the challenge
        background_image - background image to overlay 
            file - filename of background image
            x_pos - x coordinate of qr code placement
            y_pos - y coordinate of qr code placement
    """

    def get_fluff(self):
        fluff = self.get_value("fluff", False)
        return fluff if fluff is not None else ""

    def gen(self, chal_dir):
        fluff = self.get_fluff()
        background_image = self.get_value("background_image")

        out_file = 'qrcode.png'

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=0,
        )
        qr.add_data(fluff + self.flag)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")

        if background_image is not None:
            # TODO (cthompson) we should probably use something like json schema to validate the config to make this sort of validation easier
            filename = background_image.get("filename")
            x_pos = background_image.get("x_pos")
            y_pos = background_image.get("y_pos")
            if any(map(lambda x: x is None, [filename, x_pos, y_pos])):
                raise Exception(
                    f"unable to generate qr code challenge, required attributes are not set: {background_image}")

            filepath = self.get_file_path(filename)
            background = Image.open(filepath, 'r')
            offset = (x_pos, y_pos)
            background.paste(img, offset)
            background.save(os.path.join(chal_dir, out_file))
            img = background
            out_file = filename
        else:
            img.save(os.path.join(chal_dir, out_file))

        self.chal_file = out_file
