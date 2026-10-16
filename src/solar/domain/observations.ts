import type { EntityFrame } from './entities';
/** Observables use the declared parent, matching the frame used by the orbit. */
export function relativeEphemeris(frame: EntityFrame | undefined, parent: EntityFrame | undefined) {
  if(frame?.status!=='ready'||frame.parentId&&parent?.status!=='ready')return null;
  const position=parent?.status==='ready'?parent.position:{x:0,y:0,z:0};
  const velocity=parent?.status==='ready'?parent.velocity:{x:0,y:0,z:0};
  const positionKm={x:frame.position.x-position.x,y:frame.position.y-position.y,z:frame.position.z-position.z};
  const velocityKmS={x:frame.velocity.x-velocity.x,y:frame.velocity.y-velocity.y,z:frame.velocity.z-velocity.z};
  return {positionKm,velocityKmS,distanceKm:Math.hypot(positionKm.x,positionKm.y,positionKm.z),speedKmS:Math.hypot(velocityKmS.x,velocityKmS.y,velocityKmS.z)};
}
