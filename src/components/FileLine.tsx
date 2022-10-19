import "@gouvfr/dsfr/dist/dsfr.min.css";
import React, { Component } from "react";
import moment from "moment";

interface FileProps{
    name : string,
    created  : string,
    uuid : string,
    loadFn : Function,
    updateItems : Function
}

export default class FileLine extends Component<FileProps, any>{

    handleDelete(uuid : string){
        fetch("/api/fileDelete/"+uuid , {
            method : "DELETE"
        })
        .then(this.props.loadFn(false))
        .then(() => this.props.updateItems())
        .then(() => console.log("del ok"))
    }

    handleDL(uuid : string){
        fetch("api/fileDownload/"+uuid,{
            method : "GET"
        })
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.id  = uuid
          a.style.display = "none";
          a.href = url;
          //Setting file name
          a.download = this.props.name;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove()
        })
    }
    
    render(): React.ReactNode {
        return  <div className="fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-tier" id={this.props.uuid}>
                    <div className="fr-card__body">
                        <div className="fr-card__content">
                            <h3 className="fr-card__title">
                                <p>{this.props.name}</p>
                            </h3>
                            <p className="fr-card__desc">Créé le {moment(this.props.created, "YYYY-MM-DD").format("DD/MM/YYYY")}</p>
                            <div className="fr-card__start">
                            </div>
                            <div className="fr-card__end btns">
                                <button className="fr-btn mar" onClick={() => this.handleDL(this.props.uuid)}>
                                    Télécharger
                                </button>
                                <button className="fr-btn fr-btn--secondary" onClick={() => this.handleDelete(this.props.uuid)}>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        }
}