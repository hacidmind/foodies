import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const MyNote = ({ note }) => {
    const [isDeleting, setIsDeleting] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (isDeleting) {
            deleteNote()
        }
    }, [isDeleting])

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
                method: "Delete"
            });
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)
    }
    return (
        <div className="container">
            <h1 className="text-center">My Note</h1>
            <Link href={`/${note._id}/edit`}><a className="btn btn-info float-end">Edit</a></Link>
            {isDeleting ?
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
                :
                <>
                    <h2>{note.title}</h2>
                    <i>{note.origin}</i>
                    <p>{note.Description}</p>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </>
            }
        </div>
    );
}

MyNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const { data } = await res.json();
    return { note: data }
}

export default MyNote;
