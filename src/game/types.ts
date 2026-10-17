// ─────────────────────────────────────────────────────────────
// DND2 core data types (see RULES_SUMMARY.md for the rules)
// ─────────────────────────────────────────────────────────────

export type StatKey = 'hp' | 'atk' | 'pdef' | 'mdef' | 'move' | 'jump' | 'int' | 'luk' | 'acc' | 'spd';
/** For units, `hp` holds MAX HP. For allocations, values are skill points spent. */
export type Stats = Record<StatKey, number>;

export type DamageType = 'physical' | 'magic' | 'true';
export type MoveEffect = 'damage' | 'heal';
export type Targeting = 'single' | 'aoe';

export interface MoveDef {
  id: string;
  name: string;
  description: string;
  effect: MoveEffect;
  damageType: DamageType;
  baseDamage: number;
  energyCost: number;
  rangeMin: number;
  rangeMax: number;
  targeting: Targeting;
  /** Side length of the square AoE (3 = 3x3). Ignored for single target. */
  aoeSize: number;
  /** % of damage dealt to the tiles around the AoE centre (100 = uniform). */
  splashPercent: number;
  /** Boss-style telegraphed attack: resolves at the start of the user's next turn, ignores all defence. */
  unblockable: boolean;
}

export interface BasicAttack {
  name: string;
  baseDamage: number;
  damageType: DamageType;
  rangeMin: number;
  rangeMax: number;
}

export interface Passive {
  id: string;
  name: string;
  description: string;
  innate: boolean;
}

export interface Equipment {
  weapon: string;
  armour: string;
  accessory: string;
  relic: string;
}

export interface CharacterSheet {
  id: string;
  kind: 'character';
  name: string;
  portrait: string;
  level: number;
  /** Skill points spent per stat. */
  alloc: Stats;
  /** Flat bonuses from equipment / items / DM rulings (hp bonus is raw HP). */
  bonus: Stats;
  basicAttack: BasicAttack;
  moves: MoveDef[];
  passives: Passive[];
  equipment: Equipment;
  energyName: string;
  inventory: string;
  notes: string;
  currency: number;
  updatedAt: number;
}

export interface EnemyTemplate {
  id: string;
  kind: 'enemy';
  name: string;
  portrait: string;
  isBoss: boolean;
  height: number;
  /** Final stats (hp = max HP). */
  stats: Stats;
  basicAttack: BasicAttack;
  moves: MoveDef[];
  passives: Passive[];
  notes: string;
}

export type Side = 'party' | 'enemy';
export type EffectKind = 'expose' | 'brace' | 'assist' | 'opening';

export interface Effect {
  id: string;
  kind: EffectKind;
  value: number;
  /** The effect is removed at the start/end of this unit's next turn. */
  expiresUnitId: string;
  expiresWhen: 'start' | 'end';
  /** assist: which side benefits when attacking the holder. */
  forSide?: Side;
  /** opening: the unit the holder gets a bonus against. */
  vsUnitId?: string;
}

export interface Pos {
  r: number;
  c: number;
}

export interface Unit {
  id: string;
  side: Side;
  /** 'dm' or a player's client id. */
  ownerId: string;
  name: string;
  portrait: string;
  stats: Stats;
  hp: number;
  energy: number;
  gauge: number;
  ttMult: number;
  pos: Pos | null;
  basicAttack: BasicAttack;
  moves: MoveDef[];
  passives: Passive[];
  isBoss: boolean;
  height: number;
  defending: boolean;
  ko: boolean;
  effects: Effect[];
  energyName: string;
  /** Character sheet / enemy template this unit was built from. */
  sourceId: string;
}

export type TileKind = 'floor' | 'wall' | 'rubble' | 'water' | 'trap' | 'pillar' | 'rock';

export interface Tile {
  kind: TileKind;
  height: number;
}

export type PresetId = 'plains' | 'mountain' | 'dungeon' | 'small_dungeon' | 'boss';
export type BackgroundId = 'plains' | 'mountain' | 'dungeon' | 'forest' | 'boss';

export interface MapState {
  preset: PresetId;
  rows: number;
  cols: number;
  tiles: Tile[][];
  background: BackgroundId;
  seed: number;
}

export interface TurnState {
  unitId: string;
  moveLeft: number;
  moved: boolean;
  acted: boolean;
}

export type LogKind = 'system' | 'turn' | 'move' | 'attack' | 'damage' | 'heal' | 'dice' | 'warn';

export interface LogEntry {
  id: number;
  t: number;
  kind: LogKind;
  text: string;
}

export type AttackerPerk = 'shove' | 'expose' | 'assist';
export type DefenderPerk = 'reposition' | 'brace' | 'opening';
export type PerkChoice = AttackerPerk | DefenderPerk | 'custom' | 'skip';

export interface PendingPerk {
  id: string;
  chooserSide: 'attacker' | 'defender';
  /** Unit whose controller picks the perk. */
  chooserUnitId: string;
  attackerId: string;
  targetId: string;
}

export interface Telegraph {
  id: string;
  sourceId: string;
  moveName: string;
  damage: number;
  range: number;
}

export interface Player {
  id: string;
  name: string;
  connected: boolean;
}

export interface GameState {
  version: 1;
  roomCode: string;
  phase: 'setup' | 'combat';
  map: MapState;
  units: Unit[];
  players: Player[];
  turn: TurnState | null;
  turnCount: number;
  log: LogEntry[];
  logSeq: number;
  pendingPerk: PendingPerk | null;
  telegraphs: Telegraph[];
}

export type Action =
  // ── players & DM ──
  | { type: 'submit_character'; sheet: CharacterSheet; ownerId?: string }
  | { type: 'place_unit'; unitId: string; pos: Pos | null }
  | { type: 'move'; unitId: string; to: Pos }
  | { type: 'attack'; unitId: string; moveId: string; target: Pos }
  | { type: 'defend'; unitId: string }
  | { type: 'break_wall'; unitId: string; target: Pos }
  | { type: 'end_turn'; unitId: string }
  | { type: 'choose_perk'; perkId: string; choice: PerkChoice; dir?: Pos }
  | { type: 'roll_check'; unitId: string | null; label: string; stat: StatKey | null; modifier: number; dc: number | null; die: number }
  // ── DM only ──
  | { type: 'dm_generate_map'; preset: PresetId; seed?: number }
  | { type: 'dm_set_background'; background: BackgroundId }
  | { type: 'dm_paint_tile'; pos: Pos; tile: Tile }
  | { type: 'dm_add_enemy'; template: EnemyTemplate; count: number }
  | { type: 'dm_update_unit'; unitId: string; patch: UnitPatch }
  | { type: 'dm_remove_unit'; unitId: string }
  | { type: 'dm_auto_place' }
  | { type: 'dm_start_combat' }
  | { type: 'dm_end_combat' }
  | { type: 'dm_long_rest' }
  | { type: 'dm_force_turn'; unitId: string }
  | { type: 'dm_skip_turn' }
  | { type: 'dm_clear_log' }
  // ── host internal ──
  | { type: 'sys_player_join'; playerId: string; name: string }
  | { type: 'sys_player_left'; playerId: string };

export type UnitPatch = Partial<
  Pick<Unit, 'hp' | 'energy' | 'gauge' | 'ttMult' | 'stats' | 'defending' | 'ko' | 'name' | 'ownerId' | 'side' | 'pos' | 'isBoss' | 'height'>
>;
