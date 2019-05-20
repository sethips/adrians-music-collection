import React from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components/Input';
import { FieldRenderProps } from 'react-define-form';
import firebase from 'firebaseInit';

const { Form, Fields } = defineForm(f => ({
    artist: f<string>(),
    album: f<string>(),
    youtubeVideoId: f<string>(),
    discogsId: f<string>(),
    cover: f<string>()
}));

interface AdminFormFields {
    artist: string;
    album: string;
    youtubeVideoId: string;
    discogsId: string;
    cover: string;
}

const initialValues = {
    artist: '',
    album: '',
    youtubeVideoId: '',
    discogsId: '',
    cover: ''
};

type FormInput<T extends string | symbol> = FieldRenderProps<string, T, any>;

const Admin = () => {
    return (
        <div>
            <button onClick={signOut}>Log out</button>
            <Form
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Fields.artist render={getArtistField} />
                        <Fields.album render={getAlbumField} />
                        <Fields.youtubeVideoId render={getVideoField} />
                        <Fields.discogsId render={getDiscogsField} />
                        <Fields.cover render={getCoverField} />
                        <button type='submit'>Save</button>
                    </form>
                )}
            />
        </div>
    );

    function handleSubmit(values: AdminFormFields) {
        const db = firebase.firestore();
        db.collection('albums')
            .doc()
            .set(values)
            .then(function() {
                console.log('Document successfully written!');
            })
            .catch(function(error) {
                console.error('Error writing document: ', error);
            });
    }

    function signOut() {
        firebase
            .auth()
            .signOut()
            .then(function() {
                window.location.reload();
            })
            .catch(function(error) {
                console.log('ERROR', error);
            });
    }

    function getArtistField({ input, meta }: FormInput<'artist'>) {
        return (
            <Input label='Artist' required type='text' meta={meta} {...input} />
        );
    }

    function getAlbumField({ input, meta }: FormInput<'album'>) {
        return (
            <Input label='Album' required type='text' meta={meta} {...input} />
        );
    }

    function getVideoField({ input, meta }: FormInput<'youtubeVideoId'>) {
        return (
            <Input
                label='Youtube Video ID'
                required
                type='text'
                meta={meta}
                {...input}
            />
        );
    }

    function getDiscogsField({ input, meta }: FormInput<'discogsId'>) {
        return (
            <Input
                label='Discogs ID'
                type='text'
                required
                meta={meta}
                {...input}
            />
        );
    }

    function getCoverField({ input, meta }: FormInput<'cover'>) {
        return (
            <Input label='Cover' type='text' required meta={meta} {...input} />
        );
    }
};

export default Admin;
