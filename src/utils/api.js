/** MÓDULE DE INTEGRAÇÃO COM O MOP MIDDLEWARE - SOUFER INDUSTRIAL
 * Author(s): Matheus Bachega & Lucas Bachega
 * LastUpdated: 17-mar-2022
 */

import axios from "axios";
const _httpclient = axios.create({
    baseURL: 'http://sjdroid01.gruposoufer.local/mop/api/'
})

class HTTPError extends Error {
    constructor(msg) {
        super(`Erro comunicação API MOP Soufer Middleware :: ${msg}`)
        this.name = 'SOUFER_MOP_API_HTTP_ERROR'
    }
}

export default {

    /** Create a new User */
    createUser: async function ({ user, password, nome, sobrenome, npessoal, cargo, ccusto, email }) {
        try {
            const r = await _httpclient.post('/user', {
                user, password, nome, sobrenome, npessoal, cargo, ccusto, email
            })
            return {
                createdUserId: r.data.createdUserId
            }
        } catch (error) {
            throw new HTTPError(`createUser : ${error}`)
        }
    },

    /** Create a new User 
     * 'fields' é um objeto com somente os campos que serão editados
    */
    editUser: async function (id, fields) {
        try {
            const r = await _httpclient.put(`/user/${id}`, fields)
            return null
        } catch (error) {
            throw new HTTPError(`editUser : ${error}`)
        }
    },

    /** Listar Usuários  */
    listUsers: async function () {
        try {
            const r = await _httpclient.get('/user')
            if (r.data.length) {
                let users = []
                users = r.data.map(u => ({
                    id: u.id || null,
                    nome: u.nome || '',
                    npessoal: u.npessoal || '',
                    sobrenome: u.sobrenome || '',
                    user: u.user || '',
                    cargo: u.cargo || '',
                    ccusto: u.ccusto || '',
                    createdAt: u.createdAt || null,
                    email: u.email || ''
                }))

                return users

            } else {
                return []
            }
        } catch (error) {
            throw new HTTPError(`listUsers : ${error}`)
        }
    },

    /** Detalhar Usuário pelo ID */
    getUser: async function (id) {
        try {
            const r = await _httpclient.get(`/user/${id}`)
            if (r.data) {
                const u = r.data
                return {
                    id: id,
                    nome: u.nome,
                    npessoal: u.npessoal,
                    sobrenome: u.sobrenome,
                    user: u.user,
                    cargo: u.cargo,
                    ccusto: u.ccusto,
                    createdAt: u.createdAt,
                    email: u.email
                }
            } else {
                return null
            }
        } catch (error) {
            throw new HTTPError(`getUser : ${error}`)
        }
    },

    /** Remover usuário */
    deleteUser: async function (id) {
        try {
            const r = await _httpclient.delete(`/user/${id}`)
            return null
        } catch (error) {
            throw new HTTPError(`deleteUser : ${error}`)
        }
    }


}