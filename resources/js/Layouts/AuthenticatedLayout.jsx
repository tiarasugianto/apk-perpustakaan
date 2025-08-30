// resources/js/Layouts/AuthenticatedLayout.jsx
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import hasAnyPermission from "@/Utils/Permissions";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-pink-50">
            {/* Navbar */}
            <nav className="border-b border-pink-200 bg-pink-100 shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-pink-700" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {/* Home */}
                                <NavLink
                                    href={route("home")}
                                    active={route().current("home")}
                                    className="text-pink-700 hover:text-pink-900"
                                >
                                    Home
                                </NavLink>

                                {hasAnyPermission(["permissions index"]) && (
                                    <NavLink
                                        href={route("permissions.index")}
                                        active={route().current("permissions*")}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Permissions
                                    </NavLink>
                                )}
                                {hasAnyPermission(["roles index"]) && (
                                    <NavLink
                                        href={route("roles.index")}
                                        active={route().current("roles*")}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Roles
                                    </NavLink>
                                )}
                                {hasAnyPermission(['users index']) && (
                                    <NavLink
                                        href={route('users.index')}
                                        active={route().current('users*')}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Users
                                    </NavLink>
                                )}

                                {hasAnyPermission(['books index']) && (
                                    <NavLink
                                        href={route("books.index")}
                                        active={route().current("books*")}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Books
                                    </NavLink>
                                )}

                                {hasAnyPermission(['bookloans index']) && (
                                    <NavLink
                                        href={route("bookloans.index")}
                                        active={route().current("bookloans*")}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Book Loans
                                    </NavLink>
                                )}

                                {hasAnyPermission(['categories index']) && (
                                    <NavLink
                                        href={route("categories.index")}
                                        active={route().current("categories*")}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Categories
                                    </NavLink>
                                )}

                                {hasAnyPermission(['book_categories index']) && (
                                    <NavLink
                                        href={route("book_categories.index")}
                                        active={route().current("book_categories*")}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Book Category
                                    </NavLink>
                                )}

                                {hasAnyPermission(['collections index']) && (
                                    <NavLink
                                        href={route("collections.index")}
                                        active={route().current("collections*")}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Collections
                                    </NavLink>
                                )}

                                {hasAnyPermission(['reviews index']) && (
                                    <NavLink
                                        href={route("reviews.index")}
                                        active={route().current("reviews*")}
                                        className="text-pink-700 hover:text-pink-900"
                                    >
                                        Reviews
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* User dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-pink-200 px-3 py-2 text-sm font-medium leading-4 text-pink-700 transition duration-150 ease-in-out hover:text-pink-900 focus:outline-none"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route("profile.edit")}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-pink-500 transition duration-150 ease-in-out hover:bg-pink-100 hover:text-pink-700 focus:bg-pink-100 focus:text-pink-700 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive menu */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden bg-pink-50"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("home")}
                            active={route().current("home")}
                        >
                            Home
                        </ResponsiveNavLink>

                        {hasAnyPermission(["permissions index"]) && (
                            <ResponsiveNavLink
                                href={route("permissions.index")}
                                active={route().current("permissions*")}
                            >
                                Permissions
                            </ResponsiveNavLink>
                        )}

                        {hasAnyPermission(["roles index"]) && (
                            <ResponsiveNavLink
                                href={route("roles.index")}
                                active={route().current("roles*")}
                            >
                                Roles
                            </ResponsiveNavLink>
                        )}

                        {hasAnyPermission(['users index']) && (
                            <ResponsiveNavLink href={route('users.index')} active={route().current('users*')}>
                                Users
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-pink-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-pink-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-pink-600">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-pink-100 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-pink-800 font-semibold">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
