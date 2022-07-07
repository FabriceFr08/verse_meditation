import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
//import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Meditation from 'App/Models/Meditation'
import User from 'App/Models/User'

export default class UsersController {

public async home({view} : HttpContextContract){
    return view.render('home')
}

public async all({view, request} : HttpContextContract){
    //const meditations = await Meditation.all()
    const page = request.input('page', 1)
    //const meditations = await Database.from(Meditation.table).paginate(page, 2)
    const meditations = await Meditation.query().preload('user').paginate(page, 4)
    meditations.baseUrl('/all')
    return view.render('meditations.all', {
        meditations
    })
}

public async show({params, view} : HttpContextContract){ 
    const meditation = await Meditation.findOrFail(params.id)
    return view.render('meditations.show', {
        meditation
    })
}

public async updateForm({params, view} : HttpContextContract){
    const meditation = await Meditation.findOrFail(params.id)
    return view.render('meditations.update', {
        meditation
    })
}

public async update({params, request, response, session} : HttpContextContract){
    const meditation = await Meditation.findOrFail(params.id)
    meditation
              .merge(request.all())
              .save()
    session.flash({success : "La mise à jour a été éffectuée"})
    return response.redirect().toRoute('all')
    
}


public async create({request, response, params, session} : HttpContextContract){
    const user_id = (await User.findOrFail(params.id)).id
  
      const meditation = await Meditation.create({
        title : request.input('title'),
        verse : request.input('verse'),
        note : request.input('note'),
        userId : user_id
      })
  
      await meditation.save()
      session.flash({success : "La méditation a été crée"})
      return response.redirect().toRoute('all')
}

public async delete({ params, response, session}) {
    const meditation = await Meditation.findOrFail(params.id)
    //await bouncer.authorize('deleteMeditation', meditation)
    await meditation.delete()
    session.flash({success : "La méditation a été suprimée"})
    return response.redirect().toRoute('all')
}


}
