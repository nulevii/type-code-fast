import React, { Component } from 'react'
import Split from 'react-split'
import SimpleKeyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const Keyboard = () => {
  const [input, setInput] = React.useState('')
  const [layoutName, setLayoutName] = React.useState('default')
  const [gutterColor, setGutterColor] = React.useState('transperent')

  const commonKeyboardOptions = {
    onChange: input => { onChange(input) },
    onKeyPress: button => { onKeyPress(button) },
    theme: 'simple-keyboard hg-theme-default hg-layout-default',
    physicalKeyboardHighlight: true,
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: false
  }

  const keyboardOptions = {
    ...commonKeyboardOptions,
    /**
     * Layout by:
     * Sterling Butters (https://github.com/SterlingButters)
     */
    layout: {
      default: [
        '{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
        '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
        '{tab} Q W E R T Y U I O P [ ] \\',
        "{capslock} A S D F G H J K L ; ' {enter}",
        '{shiftleft} Z X C V B N M , . / {shiftright}',
        '{controlleft} {altleft} {metaleft} {space} {metaright} {altright}'
      ],
      shift: [
        '{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
        '~ ! @ # $ % ^ &amp; * ( ) _ + {backspace}',
        '{tab} Q W E R T Y U I O P [ ] \\',
        "{capslock} A S D F G H J K L ; ' {enter}",
        '{shiftleft} Z X C V B N M , . / {shiftright}',
        '{controlleft} {altleft} {metaleft} {space} {metaright} {altright}'
      ]
    },
    display: {
      '{escape}': 'ESC',
      '{tab}': 'TAB ⇥',
      '{backspace}': '⌫',
      '{enter}': 'ENTER ↵',
      '{capslock}': 'CAPS ⇪',
      '{shiftleft}': 'SHIFT ⇧',
      '{shiftright}': 'SHIFT ⇧',
      '{controlleft}': 'CTRL ⌃',
      '{controlright}': 'CTRL ⌃',
      '{altleft}': 'alt ⌥',
      '{altright}': 'alt ⌥',
      '{metaleft}': 'cmd ⌘',
      '{metaright}': 'cmd ⌘'
    }
  }

  const keyboardControlPadOptions = {
    ...commonKeyboardOptions,
    layout: {
      default: [
        '{prtscr} {scrolllock} {pause}',
        '{insert} {home} {pageup}',
        '{delete} {end} {pagedown}'
      ]
    },
    display: {
      '{prtscr}': 'PRTSC',
      '{scrolllock}': 'SCRLK',
      '{pause}': 'PAUSE',
      '{insert}': 'INS',
      '{home}': 'HOME',
      '{pageup}': 'PGUP',
      '{delete}': 'DEL',
      '{end}': 'END',
      '{pagedown}': 'PGDN'
    }
  }

  const keyboardArrowsOptions = {
    ...commonKeyboardOptions,
    layout: {
      default: ['{arrowup}', '{arrowleft} {arrowdown} {arrowright}']
    }
  }

  const keyboardNumPadOptions = {
    ...commonKeyboardOptions,
    layout: {
      default: [
        '{numlock} {numpaddivide} {numpadmultiply}',
        '{numpad7} {numpad8} {numpad9}',
        '{numpad4} {numpad5} {numpad6}',
        '{numpad1} {numpad2} {numpad3}',
        '{numpad0} {numpaddecimal}'
      ]
    }
  }

  const keyboardNumPadEndOptions = {
    ...commonKeyboardOptions,
    layout: {
      default: ['{numpadsubtract}', '{numpadadd}', '{numpadenter}']
    }
  }

  const onChange = (input) => {
    setInput(
      input
    )
  }

  const onKeyPress = button => {
    console.log('Button pressed', button)

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (
      button === '{shift}' ||
      button === '{shiftleft}' ||
      button === '{shiftright}' ||
      button === '{capslock}'
    ) {
      handleShift()
    }
  }

  const handleShift = () => {
    setLayoutName(layoutName === 'default' ? 'shift' : 'default')
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setInput(
      input
    )
  }

  return (
    <Split
      minSize={5}
      className=' flex-col h-full'
      direction='vertical'
      onDragStart={() => {
        setGutterColor('#007fd4')
      }}
      onDragEnd={(sizes) => {
        setGutterColor('transperent')
      }}
      style={{ ['--gutter-background' as string]: 'transparent' }}
      gutterSize={5}
      cursor="n-resize"
      snapOffset={50}
    >
      <input
        value={input}
        placeholder={'Tap on the virtual keyboard to start'}
        onChange={e => { console.log(e); onChangeInput(e) }}
        onKeyDown={e => { e.shiftKey && handleShift() }}
      // onKeyUp={e => { e.key === 'Shift' && handleShift() }}
      />
      <div className={'keyboardContainer'}>
        <SimpleKeyboard
          baseClass={'simple-keyboard-main'}
          // keyboardRef={r => (keyboard = r)}
          layoutName={layoutName}
          {...keyboardOptions}
        />

        <div className="controlArrows">
          <SimpleKeyboard
            baseClass={'simple-keyboard-control'}
            {...keyboardControlPadOptions}
          />
          <SimpleKeyboard
            baseClass={'simple-keyboard-arrows'}
            {...keyboardArrowsOptions}
          />
        </div>

        <div className="numPad">
          <SimpleKeyboard
            baseClass={'simple-keyboard-numpad'}
            {...keyboardNumPadOptions}
          />
          <SimpleKeyboard
            baseClass={'simple-keyboard-numpadEnd'}
            {...keyboardNumPadEndOptions}
          />
        </div>
      </div>
    </Split >
  )
}

export default Keyboard
