import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Meditation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title : string

  @column()
  public verse : string

  @column()
  public note : string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public userId : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
