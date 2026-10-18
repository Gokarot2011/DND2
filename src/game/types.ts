// DND2 Core Engine TypeScript Data Model

export type StatKey = 
  | 'hp' 
  | 'atk' 
  | 'pDef' 
  | 'mDef' 
  | 'move' 
  | 'jump' 
  | 'intelligence' 
  | 'luck' 
  | 'accuracy' 
  | 'speed';

export interface CharacterStats {
  hp: number;           // Base 20, +5 per point allocated
  atk: number;          // Base 1, physical damage & strength
  pDef: number;         // Base 1, flat physical damage reduction
  mDef: number;         // Base 1, flat magical damage reduction
  move: number;         // Base 5, max 10
  jump: number;         // Base 0, max 5 (obstacle & elevation clearance)
  intelligence: number; // Base 1, magic attack & tactical checks
  luck: number;         // Base 1, criticals & secret discovery
  accuracy: number;     // Base 1, max 5, attack hit bonus
  speed: number;        // Base 1, determines turn order
}

export type RangeType = 'melee' | 'band';

export interface AttackRange {
  type: RangeType;
  min: number; // 1 for melee, or e.g. 5 for band
  max: number; // 1 for melee, or e.g. 9 for band
}

export type TargetType = 'single' | 'aoe' | 'self';
export type AoEShape = '3x3' | 'cross' | 'line';
export type DamageType = 'physical' | 'magical' | 'pure' | 'heal';

export interface CustomMove {
  id: string;
  name: string;
  description: string;
  energyCost: number;       // 1 to 10 energy pips
  damageType: DamageType;
  basePower: number;        // Scaling base value
  scalingStat: 'atk' | 'intelligence' | 'hybrid';
  targetType: TargetType;
  aoeShape?: AoEShape;      // '3x3' hits center + 8 splash tiles
  range: AttackRange;
}

export interface Unit {
  id: string;
  name: string;
  universe?: string;
  type: 'player' | 'enemy';
  ownerId?: string;         // Player ID or 'dm'
  avatarUrl: string;
  level: number;
  stats: CharacterStats;
  currentHp: number;
  maxHp: number;
  energy: number;           // 0 to 10
  maxEnergy: number;        // Standard 10
  moves: CustomMove[];
  basicRange: AttackRange;
  
  // Tactical Battle State
  position: { x: number; y: number };
  hasMoved: boolean;
  hasActed: boolean;        // Main action spent
  hasMinor: boolean;        // Minor action spent
  isDefending: boolean;     // Active guard stance (+50% DEF reduction)
  isDead: boolean;
}

export type TileObstacle = 'none' | 'wall' | 'pillar' | 'trap';

export interface GridTile {
  x: number;
  y: number;
  elevation: number;        // 0 = ground, 1 = mid plateau, 2 = high spire
  obstacle: TileObstacle;
  wallHp?: number;          // Breakable walls start with e.g. 15 HP
  maxWallHp?: number;
  isCover?: boolean;        // Boss pillar blocks line-of-sight & unblockables
  trapTriggered?: boolean;
}

export type MapPreset = 'plains' | 'mountain' | 'dungeon' | 'forest' | 'boss';

export interface MapData {
  id: MapPreset;
  name: string;
  description: string;
  width: number;
  height: number;
  bgImage: string;
  tiles: GridTile[][];
}

export interface TurnState {
  round: number;
  currentTurnIndex: number;
  turnOrder: string[];      // Unit IDs sorted by Speed descending
  activeUnitId: string | null;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'attack' | 'damage' | 'heal' | 'move' | 'wall' | 'trap' | 'turn' | 'system';
}

export interface LobbyState {
  roomId: string;
  hostId: string;
  role: 'dm' | 'player';
  playerId: string;
  playerName: string;
  inCombat: boolean;
}
