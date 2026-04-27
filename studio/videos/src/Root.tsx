import { Composition } from 'remotion'
import { compositions } from './compositions'

export function RemotionRoot() {
  return (
    <>
      {compositions.map((comp) => (
        <Composition
          key={comp.id}
          id={comp.id}
          component={comp.component}
          durationInFrames={comp.durationInFrames}
          fps={comp.fps}
          width={comp.width}
          height={comp.height}
          defaultProps={comp.defaultProps ?? {}}
        />
      ))}
    </>
  )
}
