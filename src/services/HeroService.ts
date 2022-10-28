import { AppDataSource } from "../data-source";
import { Hero } from "../models/interfaces/HeroInterface";

/**
 * Le role du service est d'aller chercher les données,
 * pour les mettre à disposition de controlleur.
 */
export class HeroService {
  getAllHeros(): Promise<Hero[]> {
    console.log("getAllHeros", Promise);
    return AppDataSource.query(`SELECT * FROM hero;`);
  }

  getOneHeroById(id: number): Promise<Hero> {
    console.log("getOneHeroById", id);
    return AppDataSource.query(`SELECT * FROM hero h where h.id = ${id}`);
  }

  createNewHero(newHero: Hero): Promise<any> {
    console.log(newHero.name);
    return AppDataSource.query(
      /*  `INSERT into Hero values h.newHero.name = ${newHero.name}, h.newHero.power = ${newHero.power}, h.newHero.life = ${newHero.life}, newHero.id_type_weapon = ${newHero.id_type_weapon}`*/
      `INSERT into hero (name, power, life) values ('${newHero.name}', ${newHero.power}, ${newHero.life})`
    );
  }
  /* Attention : les chaines de caractères à insérer demandent à être encadrées par des -'- ou -"- */

  updateOneHero(id: number, changes: Hero): Promise<any> {
    console.log(changes.name);
    return AppDataSource.query(
      `UPDATE hero set name = '${changes.name}', power = ${changes.power}, life = ${changes.life}
      WHERE id = ${id}`
    );
  }

  /* UPDATE table
SET colonne_1 = 'valeur 1', colonne_2 = 'valeur 2', colonne_3 = 'valeur 3'
WHERE condition */

  deleteOneHero(id: number): Promise<any> {
    return AppDataSource.query(
      `DELETE FROM hero h WHERE id = ${id}    
    `
    );
  }
}

/* DELETE FROM `table`
WHERE condition */

/* "error": "UPDATE ou DELETE sur la table « hero » viole la contrainte de clé étrangère « fk_hero » de la table « fighter »" 
Comment faire pour contourner la clé étrangère sur certains heros (1, 2 ou 3) ??? */

