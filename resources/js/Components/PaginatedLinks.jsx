import React from 'react';
import { Link } from '@inertiajs/react';

export default function PaginatedLinks({ links }) {
    if (links.length < 3) return null;

    return (
        <div className="flex flex-wrap justify-center -mb-1 mt-8">
            {links.map((link, key) => (
                link.url === null ? (
                    <div
                        key={key}
                        className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <Link
                        key={key}
                        href={link.url}
                        className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-emerald-50 focus:border-emerald-500 focus:text-emerald-500 ${link.active ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-white text-gray-700'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}
