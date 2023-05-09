import React from 'react';
import { Button } from '@nextui-org/react';

interface Props {}

const CTFComponent: React.FC<Props> = () => {
  const initialFlag = 'flag{you_found_twitter}';

  return (
    <div className="text-center font-medium sm:mx-64 mt-8 flex flex-col">
      <div className="mb-4">
        <h1>Welcome to CTFg!</h1>
        <h4>Register/Login to get started.</h4>
      </div>
      <hr />
      <p className="mt-4">
        Are you ready to embark on a thrilling journey into the world of cybersecurity and digital forensics? Today, you
        will step into the shoes of a detective and use your skills to solve a complex cybercrime that has left law
        enforcement stumped.
      </p>
      <br />
      <p>
        A murder has taken place, and it's up to you to find the killer. You'll have to analyze digital evidence, comb
        through logs, and even try your hand at hacking to uncover the truth. As you dive deeper into the investigation,
        you'll encounter obstacles and challenges that will push your skills and abilities to the limit. You'll need to
        think outside the box and use your creativity to overcome these hurdles and bring the perpetrator to justice.
        Finally, write up your evidence and conclusions so they can stand up in "court."
      </p>
      <br />
      <p className="mb-4">
        The stakes are high, and failure is not an option. The fate of the case rests in your hands, and the pressure is
        on to solve the crime before it's too late. Are you up for the challenge? Can you rise to the occasion and bring
        the killer to justice? Login to{' '}
        <a href="http://twitter-flask.chals.mcpshsf.com/">
          http://twitter-flask.chals.mcpshsf.com/
        </a>{' '}
        with the username <span className="font-extrabold">“sadamana”</span> and password <span className='font-extrabold'>“s4d4m4n4”</span> to get started.
      </p>
      <hr />
      <p className='mt-4'>For help related to the competition, go to the wiki. It will help you a lot.</p>
      <Button className="mt-4" onPress={() =>
        document.location='https://wiki.ctfg.io'
      }>
          wiki
      </Button>
    </div>
  );
};

export default CTFComponent;