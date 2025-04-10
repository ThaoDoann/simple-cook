'use client';

import { useTransition, useState, useEffect } from 'react';
import { deleteRecipe } from './actions';

export default function DeleteRecipeButton({ id }) {
    const [isPending, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);

    // Handle escape key to close modal
    useEffect(() => {
        if (!showModal) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') setShowModal(false);
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    const handleDelete = () => {
        startTransition(() => {
            deleteRecipe(id);
            setShowModal(false);
        });
    };

    return (
        <>
            <button
                className={`btn btn-sm ${showModal ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setShowModal(true)}
                disabled={isPending}
            >D</button>

            {showModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this recipe? This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 