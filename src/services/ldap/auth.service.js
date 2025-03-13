import ldap from 'ldapjs';
import { CONFIG } from '@/constants';

/**
 * Authenticates a user with Active Directory using LDAP.
 *
 * @param {Object} credentials - The user's credentials.
 * @param {string} credentials.username - The username of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves to an object containing
 * the username, password, and permissions of the authenticated user.
 * @throws {Error} Throws an error if the user cannot be authenticated or if
 * there is an issue retrieving user permissions.
 */
export async function authenticateWithAD(credentials) {
  const usernameLam = credentials?.username + '@lam';
  const client = ldap.createClient({ url: CONFIG.LDAP.URI });

  client.on('error', (err) => {
    console.log(err.message); // this will be your ECONNRESET message
  });

  return new Promise((resolve, reject) => {
    client.bind(usernameLam, credentials?.password, (error) => {
      if (error) {
        console.log('no hace el bind');
        reject(new Error('Usuario o clave incorrecta'));
      } else {
        const opts = {
          filter: `(&(objectCategory=Person)(objectClass=User)(samaccountname=${credentials?.username}))`,
          scope: 'sub',
          attributes: ['memberOf'],
        };

        client.search('DC=lam,DC=domain', opts, (err, res) => {
          if (err) {
            console.log('no hace el search');
            reject(new Error('Fallo buscando los permisos del usuario'));
          } else {
            console.log('resuelve search');
            res.on('searchEntry', (entry) => {
              const respuesta = entry.pojo;
              const permisos = respuesta.attributes[0].values;
              resolve({
                username: credentials?.username,
                password: credentials?.password,
                permisos: permisos,
              });
            });

            res.on('error', (err) => {
              console.log('error search: ', err);
              reject(new Error('No se encuentran los permisos del usuario'));
            });

            res.on('end', (result) => {
              console.log('end search: ', result);
              reject(new Error('No se encuentran los permisos del usuario'));
            });
          }
        });
      }
    });
  });
}
