import React, { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react'
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscSettingsGear,
  VscAccount
} from 'react-icons/vsc'

interface SideMenuProps { setIsSideMenuOpen: Dispatch<SetStateAction<boolean>>, isSideMenuOpen: boolean }
type SideMenuStatus = 'files' | 'search' | 'repo' | 'account' | 'settings'

const SideMenu = ({ setIsSideMenuOpen, isSideMenuOpen }: SideMenuProps): JSX.Element => {
  const slideElementRef = useRef<HTMLDivElement>(null)
  const [selectedSideStatus, setSelectedSideStatus] = useState<SideMenuStatus>('files')

  const checkSideStatus = (status: SideMenuStatus) => !!(selectedSideStatus === status && isSideMenuOpen)
  const togleSideMenu = (status: SideMenuStatus) => {
    setSelectedSideStatus((prevStatus) => {
      if (prevStatus === status) {
        setIsSideMenuOpen(prevIsOpen => {
          if (prevIsOpen) {
            return false
          }
          return true
        })
        return status
      }
      setIsSideMenuOpen(true)
      return status
    })
  }

  return (
    <aside className={`flex relative bg-[#252525] ${!isSideMenuOpen ? 'max-w-[50px]' : 'max-w-xs min-w-[200px]'}`}>
      <div className={`absolute flex-grow flex flex-col max-w-2xl  h-full ${!isSideMenuOpen ? 'hidden' : ''}`}
        ref={slideElementRef}>
        <div className={`${checkSideStatus('files') ? '' : 'hidden'}`}>Files</div>
        <div className={`${checkSideStatus('search') ? '' : 'hidden'}`}>Search</div>
        <div className={`${checkSideStatus('repo') ? '' : 'hidden'}`}>Repo</div>
        <div className={`${checkSideStatus('account') ? '' : 'hidden'}`}>Account</div>
        <div className={`${checkSideStatus('settings') ? '' : 'hidden'}`}>Settings</div>
      </div>
      <nav className="flex w-13 fixed h-full right-0 flex-col bg-[#333333] text-[#858585] ">
        <div className={`p-3 border-r-2 ${checkSideStatus('files') ? 'text-white  border-white' : 'border-[#333333]'}`}
          onClick={() => { togleSideMenu('files') }}>
          <VscFiles className=" w-6 h-6 stroke-[0.5] cursor-pointer hover:text-white" />
        </div>
        <div className={`p-3 border-r-2 ${checkSideStatus('search') ? 'text-white  border-white' : 'border-[#333333]'}`}
          onClick={() => { togleSideMenu('search') }}>
          <VscSearch className=" w-6 h-6 stroke-[0.5] cursor-pointer hover:text-white" />
        </div>
        <div className={`p-3 border-r-2  ${checkSideStatus('repo') ? 'text-white  border-white' : 'border-[#333333]'}`}
          onClick={() => { togleSideMenu('repo') }}>
          <VscSourceControl className=" w-6 h-6 stroke-[0.5] cursor-pointer hover:text-white" />
        </div>
        <div className={`p-3 mt-auto border-r-2 ${checkSideStatus('account') ? 'text-white  border-white' : 'border-[#333333]'}`}
          onClick={() => { togleSideMenu('account') }}>
          <VscAccount className="w-6 h-6 stroke-[0.5] cursor-pointer hover:text-white" />
        </div>
        <div className={`p-3 border-r-2 ${checkSideStatus('settings') ? 'text-white  border-white' : 'border-[#333333]'}`}
          onClick={() => { togleSideMenu('settings') }}>
          <VscSettingsGear className=" w-6 h-6 stroke-[0.5] cursor-pointer hover:text-white" />
        </div>
      </nav>
    </aside>
  )
}

export default SideMenu
