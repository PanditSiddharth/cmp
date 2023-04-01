{ pkgs }: {
    deps = [
        pkgs.dotnet-sdk_5
        pkgs.nixos-rebuild
        pkgs.lsof
        pkgs.jdk
        pkgs.mono5
        pkgs.python39
        pkgs.gcc
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-16_x
        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}