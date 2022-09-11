import Link from 'next/link';
import fetch from "isomorphic-unfetch";
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

const NewNote = () => {
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const res = await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container-fluid">
            <h1>Create Food</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input label="Title" type="text" className="form-control" placeholder="Title" name="Title" {...register("title", { required: true, maxLength: 20 })} />
                    <p>{errors.Title?.type === 'required' && "Title is required"}</p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Origin</label>
                    <input type="text" className="form-control" placeholder="Origin" name="Origin" {...register("origin", { required: true })} />
                    <p className="text-danger">{errors.Origin?.type === 'required' && "Origin is required"}</p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="Description" rows="3" {...register("Description", { required: true })} />
                    <p className="text-danger">{errors.Description?.type === 'required' && "Description is required"}</p>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-success my-2" type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}

export default NewNote;
