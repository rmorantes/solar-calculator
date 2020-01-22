import Map from './components/Map'
import PanelSide from './components/PanelSide'

const UIDesktop = () => {
  const [isActiveSidePanel, setIsActiveSidePanel] = useState(true)
  const onClickSidePanelButtonToggle = () => setIsActiveSidePanel(prev => !prev)

  return (
    <>
      <Map
        isActiveSidePanel={isActiveSidePanel}
        setIsActiveSidePanel={setIsActiveSidePanel}
      />
      <PanelSide
        isActive={isActiveSidePanel}
        onClickButtonToggle={onClickSidePanelButtonToggle}
      />
    </>
  )
}

export default UIDesktop
