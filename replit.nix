{ pkgs }: {
    deps = [
        pkgs.python39Packages.pip
        pkgs.toybox
        pkgs.dotnet-sdk_5
        pkgs.nixos-rebuild
        pkgs.lsof
        pkgs.jdk
        pkgs.mono5
        pkgs.python39
        pkgs.gcc
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs
        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}