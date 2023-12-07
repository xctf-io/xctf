import openai
import os
from os.path import join
import re
import urllib

openai.api_key = os.environ.get("OPENAI_API_KEY")

# Queries ChatGPT to generate a website
def gen_html(prompt):    
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        max_tokens=2000,
        temperature=0.7,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        stop=None,
        n=1
    )

    return response.choices[0].text.strip()

img_names = None

def get_img_names():
    global img_names
    return img_names


# Queries DALL E to generate images.
def generate_ai_img(prompt, filename, chal_dir):
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="256x256",
    )
    
    web_data = urllib.request.urlopen(response["data"][0]["url"])
    file_data = web_data.read()
    
    with open(join(chal_dir, filename), "wb") as file:
        file.write(file_data)
    
    return filename


def add_ai_imgs(html, chal_dir):
    global img_names
    descriptions = re.findall(r'\[(.*?)\]', html)
    generated_images = []
    num_imgs = len(descriptions)
    for i in range(num_imgs):
        img_name = f"ai_img_{i + 1}.png"
        generate_ai_img(descriptions[i], img_name, chal_dir)
        generated_images.append(img_name)
    img_names = generated_images.copy()

    for match in descriptions:
        html = html.replace(f"[{match}]", generated_images.pop(0), 1)

    return html

def remove_ai_imgs(directory):
    files = os.listdir(directory)
    for file in files:
        if file.endswith('.png') and 'ai_img' in file:
            file_path = os.path.join(directory, file)
            os.remove(file_path)

def gen_full_site(prompt, save_file, chal_dir):
    try:
        remove_ai_imgs(chal_dir)

        # Generate HTML
        html_code = gen_html(prompt)
        html_code = add_ai_imgs(html_code, chal_dir)

        # Save the generated HTML
        html_file = open(join(chal_dir, save_file), "w")
        html_file.write(html_code)
    except:
        print("Generation failed. Please try again.")