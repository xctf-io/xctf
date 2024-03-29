import piexif
from piexif import GPSIFD
from fractions import Fraction

from ..gen.plugin.python_pb2 import Exif
from ..gen.chals.config_pb2 import Meta

# TODO breadchris return file?
def image_exif(self, meta: Meta, config: Exif):
    orig_img = self.get_value("orig_img")
    addl_text = self.get_value("addl_text", False)
    out_img = self.get_value("out_img")
    metadata_key = self.get_value("metadata_key")
    lat = self.get_value("lat")
    lng = self.get_value("lng")

    self.chal_file = out_img

    flag = self.flag
    if addl_text:
        flag += addl_text

    img_path = os.path.join(chal_dir, orig_img)
    img = Image.open(img_path)

    exif_dict = {}
    if 'exif' in img.info.keys() or 'Exif' in img.info.keys():
        exif_dict = piexif.load(img.info['exif'])
    else:
        exif_dict = {
            '0th': {
                258: (24, 24, 24),
                271: b'Make',
                272: b'XXX-XXX',
                282: (4294967295, 1),
                296: 65535,
                305: b'PIL',
                514: 4294967295,
                50715: ((1, 1), (1, 1), (1, 1)),
                34665: 185, 34853: 366
            },
            'Exif': {
                33434: (4294967295, 1),
                34856: b'\xaa\xaa\xaa\xaa\xaa\xaa',
                34867: 4294967295,
                36867: b'2099:09:29 10:10:10',
                37380: (2147483647, -2147483648),
                41994: 65535,
                42034: ((1, 1), (1, 1), (1, 1), (1, 1)),
                42035: b'LensMake'
            },
            'GPS': {
                0: (0, 0, 0, 1),
                2: (4294967295, 1),
                5: 1,
                29: b'1999:99:99 99:99:99',
                30: 65535
            },
            'Interop': {},
            '1st': {},
            'thumbnail': None
        }
        piexif.insert(piexif.dump(exif_dict), img_path)

    def dec_to_deg(dec):
        positive = dec >= 0
        dec = abs(dec)

        degrees = int(dec)
        minutes = (dec - int(dec)) * 60
        seconds = (minutes - int(minutes)) * 60
        return tuple([
            Fraction(num).limit_denominator(100).as_integer_ratio()
            for num in [degrees, minutes, seconds]
        ]), positive

    deg_lat, ref_lat = dec_to_deg(lat)
    deg_lng, ref_lng = dec_to_deg(lng)
    GPS_IFD = {
        GPSIFD.GPSVersionID: (0, 0, 0, 1),  # byte
        GPSIFD.GPSLatitudeRef: 'E' if ref_lat else 'W',
        GPSIFD.GPSLatitude: deg_lat,  # rational
        GPSIFD.GPSLongitudeRef: 'N' if ref_lng else 'S',
        GPSIFD.GPSLongitude: deg_lng,  # rational
    }
    exif_dict['GPS'] = GPS_IFD

    exif_dict['0th'][metadata_key] = trans_func(flag)
    exif_dict['Exif'][41729] = b'1'
    exif_bytes = piexif.dump(exif_dict)

    # TODO Support different image types
    img_out_path = os.path.join(chal_dir, self.chal_file)
    img.save(img_out_path, "jpeg", exif=exif_bytes)