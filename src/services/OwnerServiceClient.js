
import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class OwnerServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new OwnerServiceClient(_singleton);
        }
        return this[_singleton];
    }

    login(owner) {
        return fetch(constants.OWNER_LOGIN_URL, {
            method: 'put',
            body: JSON.stringify(owner),
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 404) {
                    alert("Email or Password is Incorrect");
                    return null;
                }
                else {
                    alert("Successfully Logged In");
                    window.location.reload();
                    return response.json();
                }
            })
    }

    register(owner) {
        return fetch(constants.OWNER_REGISTER_URL, {
            method: 'post',
            body: JSON.stringify(owner),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 409) {
                    alert("User Already Exist");
                    return null;
                }
                else {
                    return response.json();
                }
            });
    }

    findAccountInfoForOwner(ownerId) {
        return fetch(constants.OWNER_PROFILE_URL + '/' + ownerId, {
            credentials: 'include'
        }).then(response => (response.json()));
    }

    logout() {
        return fetch(constants.OWNER_LOGOUT_URL, {
            method: 'post',
            credentials: 'include'
        });
    }

    findCurrentOwner() {
        return fetch(constants.OWNER_SESSION_URL, {
            method: 'get',
            credentials: 'include'
        })
            .then(response => {
                if (response.status !== 404) {
                    return response.json();
                }
            });
    }

    updateAccountInfoForOwner(ownerId, owner) {
        return fetch(constants.OWNER_PROFILE_URL + '/' + ownerId, {
            method: 'put',
            body: JSON.stringify(owner),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 409) {
                alert("Something Went Wrong");
                return null;
            }
            else {
                alert("Account Updated");
                return response.json();
            }
        });
    }

    findAllOwners() {
        return fetch(constants.ALL_OWNER_URL)
            .then(response => response.json());
    }

    deleteOwner(ownerId) {
        return fetch(constants.ALL_OWNER_URL + '/' + ownerId, {
            method: 'delete'
        })
            .then(response => {
                if (response.status === 404) {
                    alert("cannot find user")
                }
            })
    }

    findOwnerById(ownerId) {
        return fetch(constants.ALL_OWNER_URL + '/' + ownerId)
            .then(response => {
                if (response.status === 404 || response.status === 400) {
                    return null;
                }
                else {
                    return response.json();
                }
            });
    }
}