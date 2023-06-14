import React from 'react'

import { TextWindow } from './text-window'
import { Keyboard } from './keyboard'

const TextSection = () => {
  return (
    <section className='flex-grow w-full flex flex-col' >
      <TextWindow />
      <Keyboard />
    </section>
  )
}

export default TextSection
