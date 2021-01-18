import React from 'react';
import './loading.scss';

export default function Loading() {
    return (
        <div className="LoadingContainer">
            <div className="lds-ellipsis">
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}