import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineDocumentReport,
} from 'react-icons/hi'
import { HiOutlineBanknotes } from 'react-icons/hi2'
import { RiFlowChart, RiUserSettingsLine, RiAiGenerate } from 'react-icons/ri'
import { IoFileTrayStackedOutline } from 'react-icons/io5'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    lps: <HiOutlineBanknotes />,
    reporting: <HiOutlineDocumentReport />,
    automations: <RiFlowChart />,
    organizationsettings: <IoFileTrayStackedOutline />,
    accountsettings: <RiUserSettingsLine />,
    virtualanalyst: <RiAiGenerate />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon
