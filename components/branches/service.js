const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const LocationShema = require('../location/schema')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')
const { team } = require('../users/team')


class Service {
    async save(params) {
        try {

            const data = new Schema({
                id: params.id,
                name: params.name,
                managerId: params.managerId
            })
            const location = new LocationShema(params.location)
            location.branchId = data.id;

            await data.save()
            await location.save()
            return data;
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async list(req) {
        try {

            const { callFunction, query } = await QueryBuilder.BRANCH_LIST(req, true)
            let data;

            switch (callFunction) {
                case 'findOne':
                    data = await Schema.findOne(query)
                    break;
                default:
                    data = await Schema.findAndCountAll(query)
            }

            return data;
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async basic(req) {
        try {

            const scrollData = [
                {
                    id: 1,
                    image: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656436764/page/home_bg1_enqgeq.jpg',
                    title: 'Genuine Kunga',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor'
                },
                {
                    id: 2,
                    image: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656436758/page/home_bg2_z322jw.jpg',
                    title: 'Joint Treatment',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                }
            ]

            const services = [
                {
                    id: 1,
                    avatar: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656490859/icons/jointTret-icon_uo1j6m.svg',
                    name: 'Joint Treatment',
                    description: 'Be they knees, wrists, hip joints and elbow joints, our therapists will diagnose each case and prescribe the requisite therapy and duration.'
                },
                {
                    id: 2,
                    avatar: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656490833/icons/chinese-arc-icon_xmfai6.svg',
                    name: 'Back Treatement',
                    description: 'We do have specific procedures designed to soothe back pain and completely eliminate any discomfort or pain in a very short period.'
                },
                {
                    id: 3,
                    avatar: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656490883/icons/shoulderTret-icon_izu2uk.svg',
                    name: 'Shoulder Treatement',
                    description: 'We offer tailor-made treatment that is structured for the shoulders.'
                },
                {
                    id: 4,
                    avatar: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656490833/icons/disabilityTret-icon_wxpm7z.svg',
                    name: 'Disability Treatement',
                    description: 'Through our therapy, people living with disability can have their lives greatly improved through increasing their energy levels, improving blood circulation .'
                },
                {
                    id: 5,
                    avatar: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656490883/icons/shoulderTret-icon_izu2uk.svg',
                    name: 'Migraines',
                    description: 'Be they knees, wrists, hip joints and elbow joints, our therapists will diagnose each case and prescribe the requisite therapy and duration'
                }
            ]

            const methods = [
                {
                    id: 1,
                    avatar: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656490876/icons/kunga-icon_ybblt9.svg',
                    name: 'Kunga',
                    description: 'An ancient Rwandan form of physiotherapy used as the first line treatment of any ailment before any herbal or traditional concoctions were used to an unwell patient. Indigenous knowledge systems’ popularity unfortunately waned with the advent of western medicines. However as most indigenous people from around the world realised the side-effects of most conventional medicines, there has been a rash to re-embrace their traditional herbs, cultures and ways of life in order to reclaim the lost harmony with their natural environment. Some have even gone as far as going back to live with nature in the country site, grow and eat own food and certainly prefer traditional therapeutic practices. This has also created a market and demand for the rise of Kunga, first in Rwanda where it originates and is rapidly spreading to most parts of Africa and beyond. We have over the years treated in excess of 22,000 people who have not shied away from recommending Kunga to many others with similar or related physical conditions. We have had a 99% treatment rate with an insignificant number not completing their total sessions being the remaining percentage'
                },
                {
                    id: 2,
                    avatar: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656490880/icons/massage-icon_bbsd54.svg',
                    name: 'Ancient Senegalese Massage',
                    description: 'This is a rigorous full body massage, one that certainly should not be executed by an inexperienced and unskilled therapist. Traditionally the massage is applied frequently, in the morning, and is given by an elder female family member, such as an aunt or grandmother, but also by professional folk healers. It’s a typical African massage practice that includes stretches, shaking, inverted suspensions, tossing in the air, firm rubbing, tapping and stroking, abdominal work, using oils (such as Touloucouna oil), butters (Shea butter), and hot herbal applications. The massage treatment is believed to be a ritual to welcome and integrate a new baby to the world. It is believed that the massage is aimed at increasing overall blood circulation in the baby’s body and strengthening the baby’s nervous system, muscles, joints, and limbs. The firm routine is also believed to make the child less emotional, less afraid, and more intelligent in life. As an organisation, Genuine Kunga Therapy has borrowed a lot from this practice and incorporated it into its own blended therapy. Our experts have studied and researched on the Senegalese massage and concluded that the philosophy and practice is a good source of inspiration and knowledge in the treatment of various physical conditions commonly seen and experienced by humans since time immemorial'
                },
                {
                    id: 3,
                    avatar: 'https://res.cloudinary.com/nextreflexe/image/upload/v1656490833/icons/chinese-arc-icon_xmfai6.svg',
                    name: 'Chinese Arcipuncture',
                    description: "Acupuncture is a traditional Chinese therapeutic practice that is based on the idea that a blockage or disturbance in the flow of the body's life energy, or qi, can cause health issues. Acupuncturists insert thin needles into specific points throughout the body to balance the body’s energy, stimulate healing, and promote relaxation. In our practice we have incorporated acupuncture by using the same philosophy of applying pressure to those acupoints in our treatment of a myriad of conditions of our patients. We do not use needles but apply pressure on the same points as in acupuncture."
                }
            ]

            const gallery = [
                {
                    id: 1,
                    image: 'https://media.istockphoto.com/photos/success-picture-id912928582?b=1&k=20&m=912928582&s=170667a&w=0&h=DVRQz_Dq4HLr0rJ02uvVPZr6MOK7_TtbeRkWFcKifu4=',
                    link: ''
                },
                {
                    id: 2,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_L6zqvKijy3UpsxdVdQO8ygcpUy4yzIh-hQ&usqp=CAU",
                    link: ''
                },
                {
                    id: 3,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrNoJWs5MIAdjGvFTmyke82LSMT1MEezibw&usqp=CAU',
                    link: ''
                },
                {
                    id: 4,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL77hcfFpNY7zrePlelBEDjp2x2t4Eu9oG6g&usqp=CAU',
                    link: ''
                },
                {
                    id: 5,
                    image: 'https://media.istockphoto.com/photos/success-picture-id912928582?b=1&k=20&m=912928582&s=170667a&w=0&h=DVRQz_Dq4HLr0rJ02uvVPZr6MOK7_TtbeRkWFcKifu4=',
                    link: ''
                },
                {
                    id: 6,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_L6zqvKijy3UpsxdVdQO8ygcpUy4yzIh-hQ&usqp=CAU",
                    link: ''
                },
                {
                    id: 7,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrNoJWs5MIAdjGvFTmyke82LSMT1MEezibw&usqp=CAU',
                    link: ''
                },
                {
                    id: 8,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL77hcfFpNY7zrePlelBEDjp2x2t4Eu9oG6g&usqp=CAU',
                    link: ''
                }
            ]
            const clinic = { experience: 11, therapists: 30, branch: 7, patients: 10873 }
            return { scrollData, clinic, services, methods, gallery, team }
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }


    async update(req) {
        try {
            const branch = await Schema.findByPk(req.params?.id)

            const updates = Object.keys(req.body)
            updates.forEach((update) => branch[update] = req.body[update])

            return await branch.save()
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async delete(req) {
        try {
            const branch = await Schema.findByPk(req.params?.id)
            if (!branch) {
                throw new Error("branch not found")
            }
            return await Schema.destroy({ where: { id: req.params?.id } })
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }
}

module.exports = Service;