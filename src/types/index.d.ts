declare module '*.png' {
    const value: any;
    export = value;
 }

export type VehicleType = 'cargo' | 'passenger' | 'special';

export type Vehicle = {
    coords: number[];
    createdAt: Date;
    driver: string;
    number: string;
    vehicleType: VehicleType
}