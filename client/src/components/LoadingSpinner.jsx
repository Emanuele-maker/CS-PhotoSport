export default function LoadingSpinner() {
  return (
    <div style={{ position: "absolute", top: 100, left: "calc(50% - 40px)" }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="lds-glow-ring" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><defs><radialGradient id="glow-ring_0.cc1f3b02317e2" cx="0.5" cy="0.5" fx="0" fy="0" r="2"><stop offset="0%" stopColor="#ffffcb"/><stop offset="100%" stopColor="#ff5c62"/></radialGradient></defs><g transform="rotate(234 50 50)">
        <circle cx="50" cy="50" r="30" stroke="#ffffcb" strokeWidth="12" fill="none" strokeOpacity="0.7"/>
        <circle cx="50" cy="50" r="30" stroke="url(#glow-ring_0.cc1f3b02317e2)" strokeWidth="10" fill="none"/>
        <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" times="0;1" dur="1s" repeatCount="indefinite"/>
      </g></svg>
    </div>
  )
}