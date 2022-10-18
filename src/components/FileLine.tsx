import "@gouvfr/dsfr/dist/dsfr.min.css";
import React, { Component } from "react";
import moment from "moment";

interface FileProps{
    name : string,
    created  : string,
    uuid : string
}

export default class FileLine extends Component<FileProps, any>{
    
    render(): React.ReactNode {
        return  <div className="fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-tier">
        <div className="fr-card__body">
            <div className="fr-card__content">
                <h3 className="fr-card__title">
                    <p>{this.props.name}</p>
                </h3>
                <p className="fr-card__desc">Créé le {moment(this.props.created, "YYYY-MM-DD").format("DD/MM/YYYY")}</p>
                <div className="fr-card__start">
                </div>
                <div className="fr-card__end btns">
                    <button className="fr-btn mar">
                        Télécharger
                    </button>
                    <button className="fr-btn fr-btn--secondary">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    </div>
        }
}