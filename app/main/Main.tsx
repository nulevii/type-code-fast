'use client'
import type React from 'react'
import { useState } from 'react'
import Split from 'react-split'
import { SideMenu } from './side-menu'
import { TextSection } from './text-section'
const Main = (): JSX.Element => {
  const [gutterColor, setGutterColor] = useState('transperent')
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true)
  return (
    <main className="flex w-full h-screen overflow-hidden">
      <Split
        collapsed={5}
        onDragStart={() => {
          setGutterColor('#007fd4')
          setIsSideMenuOpen(true)
        }}
        onDragEnd={(sizes) => {
          setGutterColor('transperent')
        }}
        onDrag={(sizes) => {
          const sideMenuSize = (sizes[1] * window.innerWidth / 100)
          if (sideMenuSize <= 120) {
            setIsSideMenuOpen(false)
          }
          if (sideMenuSize >= 120) {
            setIsSideMenuOpen(true)
          }
        }}

        style={{ ['--gutter-background' as string]: gutterColor }}
        minSize={50}
        gutterSize={5}
        cursor="e-resize"
        className="flex w-full"
        snapOffset={130}
      >
        <TextSection />
        <SideMenu setIsSideMenuOpen={setIsSideMenuOpen} isSideMenuOpen={isSideMenuOpen} />
      </Split>
    </main>
  )
}

export default Main
